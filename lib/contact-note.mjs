/** @param {string} message */
export function contactNoteHref(message) {
  const body = message.trim();
  if (!body) return null;
  return `mailto:lena.shamraeva.05@gmail.com?subject=${encodeURIComponent("A note about your portfolio")}&body=${encodeURIComponent(body)}`;
}
