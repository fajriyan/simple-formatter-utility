# I18n Formatter Utility

A comprehensive TypeScript utility library for internationalization (i18n)
formatting using the native Intl API. This package provides easy-to-use
functions for formatting dates, numbers, currencies, and more with full locale
support.

[![npm version](https://img.shields.io/npm/v/simple-formatter-utility.svg)](https://www.npmjs.com/package/simple-formatter-utility)
[![npm downloads](https://img.shields.io/npm/dm/simple-formatter-utility.svg)](https://www.npmjs.com/package/simple-formatter-utility)
[![TypeScript](https://img.shields.io/npm/types/simple-formatter-utility.svg)](https://www.npmjs.com/package/simple-formatter-utility)
[![license](https://img.shields.io/npm/l/simple-formatter-utility.svg)](https://www.npmjs.com/package/simple-formatter-utility)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/simple-formatter-utility)](https://bundlephobia.com/result?p=simple-formatter-utility)
[![GitHub issues](https://img.shields.io/github/issues/fajriyan/simple-formatter-utility)](https://github.com/fajriyan/simple-formatter-utility/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/fajriyan/simple-formatter-utility)](https://github.com/fajriyan/simple-formatter-utility/commits)

## Features

- 🌍 **Full Locale Support**: Uses native Intl API for accurate locale-specific
  formatting
- 📅 **Date & Time Formatting**: Comprehensive date, time, and datetime
  formatting
- 💰 **Currency & Numbers**: Format currencies, percentages, and numbers with
  locale awareness
- 📏 **File Sizes & Units**: Human-readable file sizes and temperature
  formatting
- ⏱️ **Relative Time**: "2 hours ago", "in 3 days" style formatting
- 🔧 **Utility Functions**: Phone masking, email masking, text formatting, and
  more
- 📦 **Zero Dependencies**: Built on native browser APIs
- 🏷️ **TypeScript Support**: Full type definitions included

## Installation

```bash
npm install simple-formatter-utility
```

## Quick Start

```typescript
import {
  formatDate,
  formatCurrency,
  formatNumber,
  formatRelativeTime,
} from "simple-formatter-utility";

// Basic usage with default locale (en-US)
console.log(formatDate(new Date())); // "12/25/2023"
console.log(formatCurrency(1234.56, "USD")); // "$1,234.56"
console.log(formatNumber(1234567.89)); // "1,234,567.89"
console.log(formatRelativeTime(new Date(Date.now() - 3600000))); // "1 hour ago"

// With custom locale
console.log(formatDate(new Date(), "id-ID")); // "25/12/2023"
console.log(formatCurrency(1234.56, "IDR", "id-ID")); // "Rp1.234,56"
```

## API Reference

### Date & Time Formatting

#### `formatDate(date, locale?, options?)`

Formats a date using Intl.DateTimeFormat.

```typescript
formatDate(new Date(), "en-US"); // "12/25/2023"
formatDate("2023-12-25", "id-ID"); // "25/12/2023"
```

#### `formatTime(date, locale?, options?)`

Formats time only.

```typescript
formatTime(new Date(), "en-US"); // "2:30 PM"
formatTime("2023-12-25T14:30:00", "id-ID"); // "14.30"
```

#### `formatDateTime(date, locale?, options?)`

Formats date and time together.

```typescript
formatDateTime(new Date()); // "December 25, 2023 at 2:30:00 PM"
```

#### `formatISODate(date)`

Returns date in YYYY-MM-DD format.

```typescript
formatISODate(new Date()); // "2023-12-25"
```

#### `formatISODateTime(date)`

Returns datetime in YYYY-MM-DD HH:MM:SS format.

```typescript
formatISODateTime(new Date()); // "2023-12-25 14:30:00"
```

#### `formatWeekday(date, locale?, format?)`

Returns the weekday name.

```typescript
formatWeekday("2023-12-25"); // "Monday"
formatWeekday("2023-12-25", "id-ID"); // "Senin"
```

#### `formatMonth(date, locale?, format?)`

Returns the month name.

```typescript
formatMonth("2023-12-25"); // "December"
formatMonth("2023-12-25", "id-ID"); // "Desember"
```

#### `formatQuarter(date)`

Returns quarter (Q1, Q2, Q3, Q4).

```typescript
formatQuarter("2023-12-25"); // "Q4"
```

#### `formatWeekNumber(date)`

Returns ISO week number.

```typescript
formatWeekNumber("2023-12-25"); // 52
```

#### `formatDayOfYear(date)`

Returns day of year (1-366).

```typescript
formatDayOfYear("2023-12-25"); // 359
```

### Relative Time & Duration

#### `formatRelativeTime(date, baseDate?, locale?)`

Formats relative time like "2 hours ago".

```typescript
formatRelativeTime(new Date(Date.now() - 3600000)); // "1 hour ago"
formatRelativeTime(new Date(Date.now() + 86400000)); // "in 1 day"
```

#### `formatTimeAgo(date, locale?)`

Similar to formatRelativeTime, optimized for past dates.

```typescript
formatTimeAgo("2023-12-24T14:30:00Z"); // "1 day ago"
```

#### `formatTimeAgoDetailed(date, locale?)`

Detailed time ago with multiple units.

```typescript
formatTimeAgoDetailed(new Date(Date.now() - 90000000)); // "1 day 1 hour ago"
```

#### `formatDuration(seconds, options?)`

Formats seconds with configurable duration output.

```typescript
formatDuration(3661); // "01:01:01"
formatDuration(3661, { style: "compact" }); // "1h 1m 1s"
formatDuration(3661, { style: "long" }); // "1 hour 1 minute 1 second"
```

#### `formatElapsedTime(seconds, options?)`

Formats seconds into human-readable duration.

```typescript
formatElapsedTime(3661); // "1h 1m 1s"
formatElapsedTime(3661, { style: "long" }); // "1 hour 1 minute 1 second"
```

#### `formatRelativeDuration(start, end)`

Calculates and formats duration between two dates.

```typescript
formatRelativeDuration("2023-12-24", "2023-12-25"); // "1d"
```

### Numbers & Currency

#### `formatNumber(number, locale?, options?)`

Formats numbers with locale-specific separators.

```typescript
formatNumber(1234567.89, "en-US"); // "1,234,567.89"
formatNumber(1234567.89, "id-ID"); // "1.234.567,89"
```

#### `formatCurrency(amount, currency?, locale?)`

Formats currency amounts.

```typescript
formatCurrency(1234.56, "USD", "en-US"); // "$1,234.56"
formatCurrency(1234.56, "IDR", "id-ID"); // "Rp1.234,56"
```

#### `formatPercent(value, locale?)`

Formats percentages.

```typescript
formatPercent(0.85, "en-US"); // "85%"
formatPercent(0.85, "id-ID"); // "85%"
```

#### `formatCompactNumber(number, locale?, options?)`

Formats numbers in compact notation (1.2K, 1.5M).

```typescript
formatCompactNumber(1250); // "1.3K"
formatCompactNumber(1500000, "id-ID"); // "1,5 jt"
```

#### `formatOrdinalNumber(number, locale?)`

Adds ordinal suffixes (1st, 2nd, 3rd).

```typescript
formatOrdinalNumber(1); // "1st"
formatOrdinalNumber(22); // "22nd"
```

### File Sizes & Units

#### `formatFileSize(bytes, locale?)`

Formats bytes into human-readable file sizes.

```typescript
formatFileSize(1024); // "1 KB"
formatFileSize(1048576); // "1 MB"
```

#### `formatFileSizeSI(bytes)`

Formats using SI units (1000-based).

```typescript
formatFileSizeSI(1000); // "1.00 KB"
```

#### `formatTemperature(value, unit?, locale?)`

Formats temperature with units.

```typescript
formatTemperature(25); // "25°C"
formatTemperature(77, "fahrenheit"); // "77°F"
```

### Time Zones

#### `formatTimeZone(date, timeZone, locale?, options?)`

Formats date in specific time zone.

```typescript
formatTimeZone("2023-12-25T10:00:00Z", "Asia/Jakarta"); // "Dec 25, 2023, 17:00"
```

#### `formatTimezoneOffset(date?)`

Returns timezone offset (UTC+X:XX).

```typescript
formatTimezoneOffset(); // "UTC+07:00"
```

#### `getTimezoneOffsetString(date?, timeZone?)`

Returns timezone offset for the current timezone or a specific timezone.

```typescript
getTimezoneOffsetString(); // "UTC+07:00"
getTimezoneOffsetString(new Date(), "America/New_York"); // "UTC-04:00"
```

#### `getUserTimezone()`

Returns user's current timezone.

```typescript
getUserTimezone(); // "Asia/Jakarta"
```

#### `listAvailableTimeZones()`

Returns supported IANA time zone identifiers.

```typescript
listAvailableTimeZones(); // ["Africa/Abidjan", "Africa/Accra", ...]
```

#### `convertTimezone(date, timeZone)`

Converts date to different timezone.

```typescript
convertTimezone(new Date(), "America/New_York");
```

### Text & Utility Formatting

#### `formatPhone(phone)`

Basic phone number formatting.

```typescript
formatPhone("081234567890"); // "081-234-567890"
```

#### `formatBoolean(value, yes?, no?)`

Formats boolean to text.

```typescript
formatBoolean(true); // "Yes"
formatBoolean(false, "Ya", "Tidak"); // "Tidak"
```

#### `formatRgbToHex(r, g, b)`

Converts RGB to hex color.

```typescript
formatRgbToHex(255, 0, 0); // "#FF0000"
```

#### `formatCapitalize(text)`

Capitalizes first letter.

```typescript
formatCapitalize("hello world"); // "Hello world"
```

#### `formatTitleCase(text)`

Converts to title case.

```typescript
formatTitleCase("hello world"); // "Hello World"
```

#### `formatSlug(text)`

Creates URL-friendly slug.

```typescript
formatSlug("Hello World!"); // "hello-world"
```

#### `formatTruncate(text, maxLength?, suffix?)`

Truncates text with suffix.

```typescript
formatTruncate("This is a long text", 10); // "This is a …"
```

#### `formatInitials(name, max?)`

Extracts initials from name.

```typescript
formatInitials("John Doe Smith"); // "JD"
```

#### `formatMaskEmail(email)`

Masks email for privacy.

```typescript
formatMaskEmail("john.doe@example.com"); // "j***e@example.com"
```

#### `formatMaskPhone(phone, visible?)`

Masks phone number.

```typescript
formatMaskPhone("081234567890", 4); // "****67890"
```

#### `formatJsonPretty(value, space?)`

Pretty-prints JSON.

```typescript
formatJsonPretty({ name: "John", age: 30 }, 2);
```

### Date Ranges & Calculations

#### `formatDateRange(start, end, locale?)`

Formats date range.

```typescript
formatDateRange("2023-12-24", "2023-12-25"); // "Dec 24, 2023 - Dec 25, 2023"
```

#### `formatAge(birthDate)`

Calculates age from birth date.

```typescript
formatAge("1990-12-25"); // 33 (depending on current date)
```

### Parsing Functions

#### `parseCurrency(value, locale?)`

Parses formatted currency string to number.

```typescript
parseCurrency("$1,234.56"); // 1234.56
```

#### `parseNumber(value)`

Parses formatted number string to number.

```typescript
parseNumber("1,234.56"); // 1234.56
```

#### `parseBoolean(value)`

Parses various formats to boolean.

```typescript
parseBoolean("true"); // true
parseBoolean("1"); // true
```

### Utility Functions

#### `formatTwoDigit(number)`

Pads number with leading zero.

```typescript
formatTwoDigit(5); // "05"
```

#### `formatClampNumber(value, min, max)`

Clamps number within range.

```typescript
formatClampNumber(15, 0, 10); // 10
```

## Examples

### Multi-language Support

```typescript
import {
  formatCurrency,
  formatDate,
  formatNumber,
} from "simple-formatter-utility";

const amount = 1234567.89;
const date = new Date();

console.log("English:", formatCurrency(amount, "USD", "en-US")); // "$1,234,567.89"
console.log("Indonesian:", formatCurrency(amount, "IDR", "id-ID")); // "Rp1.234.567,89"
console.log("German:", formatCurrency(amount, "EUR", "de-DE")); // "1.234.567,89 €"

console.log("English date:", formatDate(date, "en-US")); // "12/25/2023"
console.log("Indonesian date:", formatDate(date, "id-ID")); // "25/12/2023"
console.log("Japanese date:", formatDate(date, "ja-JP")); // "2023/12/25"
```

### Building a User Profile Display

```typescript
import {
  formatDate,
  formatAge,
  formatInitials,
  formatMaskEmail,
  formatCapitalize,
} from "simple-formatter-utility";

const user = {
  firstName: "john",
  lastName: "doe",
  email: "john.doe@example.com",
  birthDate: "1990-05-15",
  joinDate: "2020-03-10",
};

console.log(`Welcome ${formatInitials(`${user.firstName} ${user.lastName}`)}!`);
console.log(
  `Name: ${formatCapitalize(user.firstName)} ${formatCapitalize(user.lastName)}`,
);
console.log(`Age: ${formatAge(user.birthDate)}`);
console.log(`Email: ${formatMaskEmail(user.email)}`);
console.log(
  `Member since: ${formatDate(user.joinDate, "en-US", { year: "numeric", month: "long" })}`,
);
```

### File Upload Progress

```typescript
import { formatFileSize, formatElapsedTime } from "simple-formatter-utility";

function displayUploadProgress(
  uploadedBytes: number,
  totalBytes: number,
  elapsedSeconds: number,
) {
  const percentage = ((uploadedBytes / totalBytes) * 100).toFixed(1);
  const speed = uploadedBytes / elapsedSeconds;

  console.log(
    `Uploaded: ${formatFileSize(uploadedBytes)} / ${formatFileSize(totalBytes)} (${percentage}%)`,
  );
  console.log(`Time elapsed: ${formatElapsedTime(elapsedSeconds)}`);
  console.log(`Speed: ${formatFileSize(speed)}/s`);
}
```

## Browser Support

This library uses the native
[Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
which is supported in all modern browsers:

- Chrome 24+
- Firefox 29+
- Safari 10+
- Edge 12+

For older browsers, consider using a polyfill like
[intl-polyfill](https://github.com/andyearnshaw/Intl.js).

## What's Next

Potential next features for this utility library:

1. `createFormatter()` factory for setting default `locale`, `timeZone`, and
   `currency` once
2. More robust locale-aware parsing for `parseCurrency()` and `parseNumber()`
3. Safer helpers like `isValidDate()`, `safeParseDate()`, and
   `safeFormatDate()`
4. Better international support for ordinals, phone formatting, and slug
   transliteration
5. Batch formatting helpers for arrays of dates, numbers, and currencies

Pick one of these and I can help implement it next.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major
changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Repository

[https://github.com/fajriyan/simple-formatter-utility](https://github.com/fajriyan/simple-formatter-utility)

---

Thanks!
