import {
  getCreateOneCompanyUrl,
  getFindManyCompaniesUrl,
} from '@/lib/integrations/twenty/generated/endpoints/companies/companies';
import {
  getCreateOnePersonUrl,
  getFindManyPeopleUrl,
  getUpdateOnePersonUrl,
} from '@/lib/integrations/twenty/generated/endpoints/people/people';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';
import type { TwentyContactLeadDto } from '@/types/api/twenty-sync';

type TwentySyncResult = { ok: true; skipped: false } | { ok: false; skipped: true; reason: string };

const DEFAULT_TWENTY_API_BASE_URL = 'https://twenty.mardu.systems/rest';

function getTimeoutMs(): number {
  const parsed = Number(process.env.TWENTY_SYNC_TIMEOUT_MS ?? '6000');
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 6000;
  }
  return Math.floor(parsed);
}

function getApiBaseUrl(): string {
  const configured = process.env.TWENTY_API_BASE_URL?.trim();
  if (configured) {
    return configured;
  }
  return DEFAULT_TWENTY_API_BASE_URL;
}

function toAbsoluteUrl(pathname: string): string {
  const normalizedBase = getApiBaseUrl().endsWith('/') ? getApiBaseUrl() : `${getApiBaseUrl()}/`;
  const normalizedPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return new URL(normalizedPath, normalizedBase).toString();
}

function getObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  return value as Record<string, unknown>;
}

function getNestedValue(root: unknown, path: string[]): unknown {
  let current: unknown = root;
  for (const key of path) {
    const obj = getObject(current);
    if (!obj) {
      return undefined;
    }
    current = obj[key];
  }
  return current;
}

function getNestedString(root: unknown, path: string[]): string | undefined {
  const value = getNestedValue(root, path);
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function getNestedArray(root: unknown, path: string[]): unknown[] {
  const value = getNestedValue(root, path);
  return Array.isArray(value) ? value : [];
}

function getFirstIdFromCollection(root: unknown, path: string[]): string | undefined {
  const items = getNestedArray(root, path);
  for (const item of items) {
    const obj = getObject(item);
    if (!obj) {
      continue;
    }
    const id = obj.id;
    if (typeof id === 'string' && id.length > 0) {
      return id;
    }
  }
  return undefined;
}

function splitName(name: string): { firstName: string; lastName?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { firstName: 'Unknown' };
  }

  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() ?? 'Unknown';
  const lastName = parts.join(' ').trim();
  return lastName ? { firstName, lastName } : { firstName };
}

function extractDomain(email: string): string | undefined {
  const atIndex = email.lastIndexOf('@');
  if (atIndex < 0 || atIndex === email.length - 1) {
    return undefined;
  }
  const domain = email
    .slice(atIndex + 1)
    .trim()
    .toLowerCase();
  if (!domain.includes('.')) {
    return undefined;
  }
  return domain;
}

function buildHeaders(contentType = false): HeadersInit {
  const apiKey = process.env.TWENTY_API_KEY;
  const headers: Record<string, string> = {};
  if (contentType) {
    headers['Content-Type'] = 'application/json';
  }
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return headers;
}

async function requestTwenty(pathname: string, init?: RequestInit): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getTimeoutMs());

  try {
    const res = await fetch(toAbsoluteUrl(pathname), {
      ...init,
      headers: {
        ...buildHeaders(Boolean(init?.body)),
        ...init?.headers,
      },
      signal: controller.signal,
    });

    const body = await res.text().catch(() => '');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}${body ? `: ${body}` : ''}`);
    }

    if (!body) {
      return {};
    }

    return JSON.parse(body) as unknown;
  } finally {
    clearTimeout(timeout);
  }
}

async function findCompanyIdByName(name: string): Promise<string | undefined> {
  const response = await requestTwenty(
    getFindManyCompaniesUrl({
      filter: `name[eq]:${JSON.stringify(name)}`,
      limit: 1,
    }),
    { method: 'GET' },
  );

  return getFirstIdFromCollection(response, ['data', 'companies']);
}

async function ensureCompany(name: string, emailForDomain?: string): Promise<string | undefined> {
  const existingId = await findCompanyIdByName(name);
  if (existingId) {
    return existingId;
  }

  const domain = emailForDomain ? extractDomain(emailForDomain) : undefined;
  const payload: Record<string, unknown> = { name };
  if (domain) {
    payload.domainName = {
      primaryLinkLabel: domain,
      primaryLinkUrl: `https://${domain}`,
    };
  }

  const created = await requestTwenty(getCreateOneCompanyUrl({ upsert: true }), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return getNestedString(created, ['data', 'createCompany', 'id']);
}

async function findPersonIdByEmail(email: string): Promise<string | undefined> {
  const response = await requestTwenty(
    getFindManyPeopleUrl({
      filter: `emails.primaryEmail[eq]:${JSON.stringify(email)}`,
      limit: 1,
    }),
    { method: 'GET' },
  );

  return getFirstIdFromCollection(response, ['data', 'people']);
}

type EnsurePersonInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  companyId?: string;
};

async function ensurePerson(input: EnsurePersonInput): Promise<string | undefined> {
  const payload: Record<string, unknown> = {
    emails: {
      primaryEmail: input.email,
    },
  };

  if (input.firstName?.trim() || input.lastName?.trim()) {
    payload.name = {
      ...(input.firstName?.trim() ? { firstName: input.firstName.trim() } : {}),
      ...(input.lastName?.trim() ? { lastName: input.lastName.trim() } : {}),
    };
  } else if (input.fullName?.trim()) {
    payload.name = splitName(input.fullName);
  }

  if (input.phone?.trim()) {
    payload.phones = {
      primaryPhoneNumber: input.phone.trim(),
    };
  }

  if (input.companyId) {
    payload.companyId = input.companyId;
  }

  const personId = await findPersonIdByEmail(input.email);
  if (personId) {
    const updated = await requestTwenty(getUpdateOnePersonUrl(personId), {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return getNestedString(updated, ['data', 'updatePerson', 'id']) ?? personId;
  }

  const created = await requestTwenty(getCreateOnePersonUrl({ upsert: true }), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return getNestedString(created, ['data', 'createPerson', 'id']);
}

export async function syncContactLeadToTwenty(
  payload: TwentyContactLeadDto,
): Promise<TwentySyncResult> {
  const apiKey = process.env.TWENTY_API_KEY;
  if (!apiKey) {
    return { ok: false, skipped: true, reason: 'TWENTY_API_KEY not configured' };
  }

  const normalizedCompany = payload.company?.trim();
  const companyId = normalizedCompany
    ? await ensureCompany(normalizedCompany, payload.email)
    : undefined;
  await ensurePerson({
    email: payload.email,
    fullName: payload.name,
    phone: payload.phone,
    companyId,
  });

  return { ok: true, skipped: false };
}

export async function sendNewsletterEventToTwenty(
  payload: NewsletterCrmEventDto,
): Promise<TwentySyncResult> {
  const hasApiKey = Boolean(process.env.TWENTY_API_KEY);
  if (!hasApiKey) {
    return {
      ok: false,
      skipped: true,
      reason: 'TWENTY_API_KEY not configured',
    };
  }

  const normalizedCompany = payload.company?.trim();
  const companyId = normalizedCompany
    ? await ensureCompany(normalizedCompany, payload.email)
    : undefined;

  await ensurePerson({
    email: payload.email,
    ...(payload.firstName ? { firstName: payload.firstName } : {}),
    ...(payload.lastName ? { lastName: payload.lastName } : {}),
    ...(companyId ? { companyId } : {}),
  });

  return { ok: true, skipped: false };
}
