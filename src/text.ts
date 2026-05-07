export function formatPhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
}

export function formatBoolean(value: boolean, yes = "Yes", no = "No") {
  return value ? yes : no;
}

export function formatCapitalize(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export function formatTruncate(text: string, maxLength = 50, suffix = "…") {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + suffix : text;
}

export function formatTitleCase(text: string) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatInitials(name: string, max = 2) {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, max)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function formatMaskEmail(email: string) {
  if (!email.includes("@")) return email;
  const [name, domain] = email.split("@");
  return name[0] + "***" + name[name.length - 1] + "@" + domain;
}

export function formatMaskPhone(phone: string, visible = 4) {
  const clean = phone.replace(/\D/g, "");
  const masked = clean.slice(0, -visible).replace(/\d/g, "*");
  return masked + clean.slice(-visible);
}

export function formatJsonPretty(value: unknown, space = 2) {
  return JSON.stringify(value, null, space);
}
