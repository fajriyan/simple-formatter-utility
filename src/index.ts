export function formatDate(
  date: Date | string,
  locale = "en-US",
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatNumber(
  number: number,
  locale = "en-US",
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, options).format(number);
}

export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
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

export function formatDateTime(
  date: Date | string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatTime(
  date: Date | string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;
}


export function formatRelativeTime(
  date: Date | string,
  baseDate: Date = new Date(),
  locale = "en-US"
) {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const diffInMs = new Date(date).getTime() - baseDate.getTime();
  const diffInSec = Math.round(diffInMs / 1000);

  const thresholds = [
    { unit: "second", limit: 60, divisor: 1 },
    { unit: "minute", limit: 3600, divisor: 60 },
    { unit: "hour", limit: 86400, divisor: 3600 },
    { unit: "day", limit: 2592000, divisor: 86400 },
    { unit: "month", limit: 31536000, divisor: 2592000 },
    { unit: "year", limit: Infinity, divisor: 31536000 },
  ];

  for (const { unit, limit, divisor } of thresholds) {
    if (Math.abs(diffInSec) < limit) {
      return rtf.format(Math.round(diffInSec / divisor), unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return rtf.format(0, "second");
}

