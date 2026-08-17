export function normalizeUrl(val: string) {
  const input = val.trim();

  const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Invalid URL protocol");
  }

  return url.href;
}
