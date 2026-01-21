export function formatDate(
  date: Date | string,
  locale = "en-US",
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
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
  },
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatTime(
  date: Date | string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" },
) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export function formatDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;
}

export function formatRelativeTime(
  date: Date | string,
  baseDate: Date = new Date(),
  locale = "en-US",
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
      return rtf.format(
        Math.round(diffInSec / divisor),
        unit as Intl.RelativeTimeFormatUnit,
      );
    }
  }

  return rtf.format(0, "second");
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

export function formatWeekday(
  date: Date | string,
  locale = "en-US",
  weekday: "long" | "short" | "narrow" = "long",
) {
  return new Intl.DateTimeFormat(locale, { weekday }).format(new Date(date));
}

export function formatMonth(
  date: Date | string,
  locale = "en-US",
  month: "long" | "short" | "narrow" = "long",
) {
  return new Intl.DateTimeFormat(locale, { month }).format(new Date(date));
}

export function formatISODate(date: Date | string) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
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

export function formatDayOfYear(date: Date | string) {
  const current = new Date(date);
  const start = new Date(current.getFullYear(), 0, 0);
  const diff =
    current.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - current.getTimezoneOffset()) * 60 * 1000;
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return day;
}

export function formatTimeAgo(date: Date | string, locale = "en-US") {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  type Unit = "second" | "minute" | "hour" | "day" | "month" | "year";

  const thresholds: { limit: number; label: Unit }[] = [
    { limit: 60, label: "second" },
    { limit: 3600, label: "minute" },
    { limit: 86400, label: "hour" },
    { limit: 2592000, label: "day" },
    { limit: 31536000, label: "month" },
    { limit: Infinity, label: "year" },
  ];

  const divisorMap: Record<Unit, number> = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    month: 2592000,
    year: 31536000,
  };

  for (const { limit, label } of thresholds) {
    if (diffInSeconds < limit) {
      const divisor = divisorMap[label];
      const value = Math.floor(diffInSeconds / divisor);
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
        -value,
        label,
      );
    }
  }

  return new Intl.RelativeTimeFormat(locale).format(0, "second");
}

export function formatTimeAgoDetailed(date: Date | string, locale = "en-US") {
  const now = new Date();
  const past = new Date(date);
  let diff = Math.floor((now.getTime() - past.getTime()) / 1000); // detik

  if (diff < 5) return "just now";

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  const parts = [];

  for (const unit of units) {
    const amount = Math.floor(diff / unit.seconds);
    if (amount > 0) {
      parts.push(`${amount} ${unit.label}${amount > 1 ? "s" : ""}`);
      diff -= amount * unit.seconds;
    }
    if (parts.length >= 2) break;
  }

  return parts.join(" ") + " ago";
}

export function formatTimeZone(
  date: Date | string,
  timeZone: string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
) {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(
    new Date(date),
  );
}

export function formatElapsedTime(seconds: number) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (secs || parts.length === 0) parts.push(`${secs}s`);
  return parts.join(" ");
}

export function formatRelativeDuration(
  start: Date | string,
  end: Date | string,
) {
  const diffSec =
    Math.abs(new Date(end).getTime() - new Date(start).getTime()) / 1000;
  return formatElapsedTime(diffSec);
}

export function formatTemperature(
  value: number,
  unit: "celsius" | "fahrenheit" = "celsius",
  locale = "en-US",
) {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: "narrow",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatTimezoneOffset(date: Date | string = new Date()) {
  const offset = new Date(date).getTimezoneOffset();
  const sign = offset <= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.abs(offset % 60)
    .toString()
    .padStart(2, "0");
  return `UTC${sign}${hours}:${minutes}`;
}

// Format ISO DateTime (YYYY-MM-DD HH:MM:SS)
export function formatISODateTime(date: Date | string) {
  const d = new Date(date);
  return d.toISOString().replace("T", " ").split(".")[0];
}

// Format Quarter of Year (Q1, Q2, ...)
export function formatQuarter(date: Date | string) {
  const d = new Date(date);
  return `Q${Math.floor(d.getMonth() / 3) + 1}`;
}

// Format Week Number (ISO week)
export function formatWeekNumber(date: Date | string) {
  const d = new Date(date);
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 1);
  const dayDiff = (target.valueOf() - firstThursday.valueOf()) / 86400000;
  return Math.floor(dayDiff / 7) + 1;
}

// Format Phone Number (sederhana)
export function formatPhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
}

// Format Boolean to Yes/No (atau sesuai locale)
export function formatBoolean(value: boolean, yes = "Yes", no = "No") {
  return value ? yes : no;
}

// Format RGB → HEX
export function formatRgbToHex(r: number, g: number, b: number) {
  const toHex = (x: number) => x.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function formatCapitalize(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Format slug (lowercase + ganti spasi ke -)
export function formatSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export function formatTwoDigit(n: number) {
  return n.toString().padStart(2, "0");
}

// Truncate text
export function formatTruncate(text: string, maxLength = 50, suffix = "…") {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + suffix : text;
}

// Title Case
export function formatTitleCase(text: string) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Initials (nama → inisial)
export function formatInitials(name: string, max = 2) {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, max)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// Mask Email
export function formatMaskEmail(email: string) {
  if (!email.includes("@")) return email;
  const [name, domain] = email.split("@");
  return name[0] + "***" + name[name.length - 1] + "@" + domain;
}

// Mask Phone
export function formatMaskPhone(phone: string, visible = 4) {
  const clean = phone.replace(/\D/g, "");
  const masked = clean.slice(0, -visible).replace(/\d/g, "*");
  return masked + clean.slice(-visible);
}

// Clamp number ke range tertentu
export function formatClampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Pretty JSON
export function formatJsonPretty(value: unknown, space = 2) {
  return JSON.stringify(value, null, space);
}

// SI File Size (KB, MB, GB berbasis 1000)
export function formatFileSizeSI(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log10(bytes) / 3);
  const size = bytes / Math.pow(1000, i);
  return `${size.toFixed(2)} ${units[i]}`;
}

// Date Range
export function formatDateRange(
  start: Date | string,
  end: Date | string,
  locale = "en-US",
) {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(new Date(start))} - ${formatter.format(
    new Date(end),
  )}`;
}

// Hitung umur
export function formatAge(birthDate: Date | string) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
