import { createHmac } from 'crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { dataPath } from '@/lib/data-dir';

const SUBSCRIBERS_FILE = dataPath('newsletter.json');

export type NewsletterTokenPayload = {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  company?: string;
};

export type NewsletterSubscriber = NewsletterTokenPayload;

function getSecret() {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) {
    throw new Error('Missing newsletter secret');
  }
  return secret;
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createToken(
  email: string,
  role: string,
  extra?: Pick<NewsletterTokenPayload, 'firstName' | 'lastName' | 'company'>,
): string {
  const payload: NewsletterTokenPayload = {
    email,
    role,
    ...(extra?.firstName ? { firstName: extra.firstName } : {}),
    ...(extra?.lastName ? { lastName: extra.lastName } : {}),
    ...(extra?.company ? { company: extra.company } : {}),
  };

  const serialized = JSON.stringify(payload);
  const encoded = Buffer.from(serialized).toString('base64url');
  return `${encoded}.${sign(serialized)}`;
}

function parseNewToken(token: string): NewsletterTokenPayload | null {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const decoded = Buffer.from(encodedPayload, 'base64url').toString('utf8');
  const expected = sign(decoded);
  if (expected !== signature) {
    return null;
  }

  const parsed = JSON.parse(decoded) as Partial<NewsletterTokenPayload>;
  if (!parsed.email || !parsed.role) {
    return null;
  }

  return {
    email: parsed.email,
    role: parsed.role,
    ...(parsed.firstName ? { firstName: parsed.firstName } : {}),
    ...(parsed.lastName ? { lastName: parsed.lastName } : {}),
    ...(parsed.company ? { company: parsed.company } : {}),
  };
}

function parseLegacyToken(token: string): NewsletterTokenPayload | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [email, role, signature] = decoded.split(':');
    if (!email || !role || !signature) {
      return null;
    }
    const expected = sign(`${email}:${role}`);
    if (signature !== expected) {
      return null;
    }
    return { email, role };
  } catch {
    return null;
  }
}

export function verifyToken(token: string): NewsletterTokenPayload | null {
  try {
    return parseNewToken(token) ?? parseLegacyToken(token);
  } catch {
    return null;
  }
}

async function readSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf8');
    const raw = JSON.parse(data) as unknown[];
    if (!Array.isArray(raw)) {
      return [];
    }

    return raw
      .map((entry) => {
        if (!entry || typeof entry !== 'object') {
          return null;
        }
        const candidate = entry as Partial<NewsletterSubscriber>;
        if (!candidate.email || !candidate.role) {
          return null;
        }
        return {
          email: candidate.email,
          role: candidate.role,
          ...(candidate.firstName ? { firstName: candidate.firstName } : {}),
          ...(candidate.lastName ? { lastName: candidate.lastName } : {}),
          ...(candidate.company ? { company: candidate.company } : {}),
        };
      })
      .filter((entry): entry is NewsletterSubscriber => entry !== null);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: NewsletterSubscriber[]) {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function saveSubscriber(subscriber: NewsletterSubscriber) {
  try {
    const subscribers = await readSubscribers();
    const index = subscribers.findIndex((item) => item.email === subscriber.email);

    if (index < 0) {
      subscribers.push(subscriber);
    } else {
      subscribers[index] = {
        ...subscribers[index],
        ...subscriber,
      };
    }

    await writeSubscribers(subscribers);
  } catch (err) {
    console.error('Failed to save subscriber', err);
  }
}

export async function removeSubscriber(email: string): Promise<NewsletterSubscriber | null> {
  try {
    const subscribers = await readSubscribers();
    const removed = subscribers.find((item) => item.email === email) ?? null;
    const filtered = subscribers.filter((item) => item.email !== email);
    await writeSubscribers(filtered);
    return removed;
  } catch (err) {
    console.error('Failed to remove subscriber', err);
    return null;
  }
}
