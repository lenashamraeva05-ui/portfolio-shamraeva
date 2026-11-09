export const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/lena.shamraeva.05@gmail.com";

export class ContactDeliveryUnknownError extends Error {
  constructor() {
    super("We couldn't confirm delivery. Your message may already have been sent. Your draft is still here; please avoid sending it again right away.");
    this.name = "ContactDeliveryUnknownError";
  }
}

/** @param {{message: string, email?: string, honey?: string}} note
 * @param {typeof fetch} send
 * @param {{timeoutMs?: number}} options
 */
export async function submitContactNote(note, send = fetch, { timeoutMs = 90000 } = {}) {
  const message = note.message.trim();
  const email = (note.email ?? "").trim();
  if (!message || message.length > 4000) throw new Error("Please write a message of up to 4,000 characters.");
  if (note.honey) return { activationPending: false };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response;
    try { response = await send(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message, ...(email ? { email, _replyto: email } : {}), _subject: "A note from Helen's portfolio", _template: "table" }),
      signal: controller.signal,
    }); } catch { throw new ContactDeliveryUnknownError(); }
    if (response.status >= 500) throw new ContactDeliveryUnknownError();
    if (!response.ok) throw new Error("Your message could not be sent. Please try again or use the Email link above.");
    let result;
    try { result = await response.json(); } catch { throw new ContactDeliveryUnknownError(); }
    if (result.success !== true && result.success !== "true") throw new Error("Your message could not be sent. Please try again or use the Email link above.");
    return { activationPending: /activat|confirm.*(?:email|address)|check.*(?:email|inbox)/i.test(String(result.message ?? "")) };
  } finally { clearTimeout(timeout); }
}
