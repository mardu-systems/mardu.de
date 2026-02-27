import type {NewsletterCrmEventDto} from "@/types/api/newsletter-crm";

type TwentySyncResult =
    | {ok: true; skipped: false}
    | {ok: false; skipped: true; reason: string};

function getTimeoutMs(): number {
    const parsed = Number(process.env.TWENTY_SYNC_TIMEOUT_MS ?? "6000");
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return 6000;
    }
    return Math.floor(parsed);
}

export async function sendNewsletterEventToTwenty(
    payload: NewsletterCrmEventDto,
): Promise<TwentySyncResult> {
    const syncUrl = process.env.TWENTY_SYNC_URL;
    if (!syncUrl) {
        return {ok: false, skipped: true, reason: "TWENTY_SYNC_URL not configured"};
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const apiKey = process.env.TWENTY_API_KEY;
    if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), getTimeoutMs());

    try {
        const res = await fetch(syncUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        if (!res.ok) {
            const errorBody = await res.text().catch(() => "");
            throw new Error(`HTTP ${res.status} ${res.statusText}${errorBody ? `: ${errorBody}` : ""}`);
        }

        return {ok: true, skipped: false};
    } finally {
        clearTimeout(timeout);
    }
}

