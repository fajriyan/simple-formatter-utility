function toDate(value: Date | string) {
  return new Date(value);
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
    toDate(date),
  );
}

export function formatTimezoneOffset(date: Date | string = new Date()) {
  const offset = toDate(date).getTimezoneOffset();
  const sign = offset <= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.abs(offset % 60)
    .toString()
    .padStart(2, "0");
  return `UTC${sign}${hours}:${minutes}`;
}

export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function convertTimezone(date: Date | string, timeZone: string) {
  const source = toDate(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(source);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return new Date(
    Date.UTC(
      Number(lookup.year),
      Number(lookup.month) - 1,
      Number(lookup.day),
      Number(lookup.hour),
      Number(lookup.minute),
      Number(lookup.second),
    ),
  );
}
