function getLocaleSeparators(locale: string) {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  return {
    group: parts.find((part) => part.type === "group")?.value ?? ",",
    decimal: parts.find((part) => part.type === "decimal")?.value ?? ".",
  };
}

function normalizeNumericValue(value: string, locale: string) {
  const { group, decimal } = getLocaleSeparators(locale);

  return value
    .replace(/[^\d.,\-]/g, "")
    .split(group)
    .join("")
    .split(decimal)
    .join(".");
}

export function parseCurrency(value: string, locale = "en-US") {
  return parseFloat(normalizeNumericValue(value, locale));
}

export function parseNumber(value: string, locale = "en-US") {
  return Number(normalizeNumericValue(value, locale));
}

export function parseBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return ["true", "1", "yes"].includes(value.toLowerCase());
  }
  return Boolean(value);
}
