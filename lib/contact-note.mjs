export const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/lena.shamraeva.05@gmail.com";

/** @param {{message: string, email?: string, honey?: string}} note
 * @param {typeof fetch} send
 */
export async function submitContactNote(note, send = fetch) {
  const message = note.message.trim();
  const email = (note.email ?? "").trim();
  if (!message || message.length > 4000) throw new Error("Please write a message of up to 4,000 characters.");
  if (note.honey) return { activationPending: false };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await send(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message, ...(email ? { email, _replyto: email } : {}), _subject: "A note from Helen's portfolio", _template: "table" }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Your message could not be sent. Please try again or use the Email link above.");
    const result = await response.json();
    if (result.success !== true && result.success !== "true") throw new Error("Your message could not be sent. Please try again or use the Email link above.");
    return { activationPending: /activat|confirm.*(?:email|address)|check.*(?:email|inbox)/i.test(String(result.message ?? "")) };
  } finally { clearTimeout(timeout); }
}
