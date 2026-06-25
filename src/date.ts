const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_MONTH = 30 * MS_PER_DAY;
const MS_PER_YEAR = 365 * MS_PER_DAY;

type DurationFormatStyle = "short" | "compact" | "long";

interface DurationFormatOptions {
  style?: DurationFormatStyle;
}

function toDate(value: Date | string) {
  return new Date(value);
}

function normalizeDurationSeconds(seconds: number) {
  const totalSeconds = Math.floor(Math.abs(seconds));
  return {
    isNegative: seconds < 0,
    totalSeconds,
  };
}

function formatShortDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function formatCompactDuration(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

function formatLongDuration(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (days) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  if (minutes) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  if (seconds || parts.length === 0) {
    parts.push(`${seconds} second${seconds === 1 ? "" : "s"}`);
  }
  return parts.join(" ");
}

export function formatDate(
  date: Date | string,
  locale = "en-US",
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(locale, options).format(toDate(date));
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
  return new Intl.DateTimeFormat(locale, options).format(toDate(date));
}

export function formatTime(
  date: Date | string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" },
) {
  return new Intl.DateTimeFormat(locale, options).format(toDate(date));
}

export function formatDuration(
  seconds: number,
  options: DurationFormatOptions = {},
) {
  const { isNegative, totalSeconds } = normalizeDurationSeconds(seconds);
  const style = options.style ?? "short";
  const prefix = isNegative && totalSeconds > 0 ? "-" : "";

  if (style === "compact") {
    return prefix + formatCompactDuration(totalSeconds);
  }

  if (style === "long") {
    return prefix + formatLongDuration(totalSeconds);
  }

  return prefix + formatShortDuration(totalSeconds);
}

export function formatRelativeTime(
  date: Date | string,
  baseDate: Date = new Date(),
  locale = "en-US",
) {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const diffInMs = toDate(date).getTime() - baseDate.getTime();
  const diffInSec = Math.round(diffInMs / MS_PER_SECOND);

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

export function formatWeekday(
  date: Date | string,
  locale = "en-US",
  weekday: "long" | "short" | "narrow" = "long",
) {
  return new Intl.DateTimeFormat(locale, { weekday }).format(toDate(date));
}

export function formatMonth(
  date: Date | string,
  locale = "en-US",
  month: "long" | "short" | "narrow" = "long",
) {
  return new Intl.DateTimeFormat(locale, { month }).format(toDate(date));
}

export function formatISODate(date: Date | string) {
  return toDate(date).toISOString().split("T")[0];
}

export function formatDayOfYear(date: Date | string) {
  const current = toDate(date);
  const start = new Date(current.getFullYear(), 0, 0);
  const diff =
    current.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - current.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / MS_PER_DAY);
}

export function formatTimeAgo(date: Date | string, locale = "en-US") {
  const now = new Date();
  const past = toDate(date);
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
  const past = toDate(date);
  let diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 5) return "just now";

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  const parts: string[] = [];

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

export function formatElapsedTime(
  seconds: number,
  options: DurationFormatOptions = {},
) {
  return formatDuration(seconds, {
    style: options.style ?? "compact",
  });
}

export function formatRelativeDuration(
  start: Date | string,
  end: Date | string,
) {
  const diffSec =
    Math.abs(toDate(end).getTime() - toDate(start).getTime()) / 1000;
  return formatElapsedTime(diffSec);
}

export function formatISODateTime(date: Date | string) {
  return toDate(date).toISOString().replace("T", " ").split(".")[0];
}

export function formatQuarter(date: Date | string) {
  const d = toDate(date);
  return `Q${Math.floor(d.getMonth() / 3) + 1}`;
}

export function formatWeekNumber(date: Date | string) {
  const d = toDate(date);
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 1);
  const dayDiff = (target.valueOf() - firstThursday.valueOf()) / 86400000;
  return Math.floor(dayDiff / 7) + 1;
}

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

  const rangeFormatter = formatter as Intl.DateTimeFormat & {
    formatRange?: (startDate: Date, endDate: Date) => string;
  };

  if (typeof rangeFormatter.formatRange === "function") {
    return rangeFormatter.formatRange(toDate(start), toDate(end));
  }

  return `${formatter.format(toDate(start))} - ${formatter.format(toDate(end))}`;
}

export function formatAge(birthDate: Date | string) {
  const birth = toDate(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
