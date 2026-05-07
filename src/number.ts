function toDate(value: Date | string) {
  return new Date(value);
}

export function formatNumber(
  number: number,
  locale = "en-US",
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locale, options).format(number);
}

export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatPercent(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCompactNumber(
  number: number,
  locale = "en-US",
  options: Intl.NumberFormatOptions = {
    notation: "compact",
    maximumFractionDigits: 1,
  },
) {
  return new Intl.NumberFormat(locale, options).format(number);
}

export function formatOrdinalNumber(number: number, locale = "en-US") {
  const pluralRules = new Intl.PluralRules(locale, { type: "ordinal" });
  const suffixes: Record<string, string> = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };

  const category = pluralRules.select(number);
  const suffix = suffixes[category] || "";
  return `${number}${suffix}`;
}

export function formatFileSize(bytes: number, locale = "en-US") {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return (
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
    }).format(size) +
    " " +
    units[i]
  );
}

export function formatTemperature(
  value: number,
  unit: "celsius" | "fahrenheit" = "celsius",
  locale = "en-US",
) {
  const intlUnit = unit === "celsius" ? "degree-celsius" : "degree-fahrenheit";

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: intlUnit as Intl.NumberFormatOptions["unit"],
    unitDisplay: "narrow",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatRgbToHex(r: number, g: number, b: number) {
  const toHex = (x: number) => x.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function formatTwoDigit(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatClampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function formatFileSizeSI(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log10(bytes) / 3);
  const size = bytes / Math.pow(1000, i);
  return `${size.toFixed(2)} ${units[i]}`;
}
