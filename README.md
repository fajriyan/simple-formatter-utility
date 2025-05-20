## simple-formatter-utility

for ES2020 or above

how to install

```
npm i simple-formatter-utility
```

how to use

```
import {
  formatDate,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatDateTime,
  formatTime,
  formatDuration,
  formatRelativeTime,
  formatCompactNumber,
  formatOrdinalNumber,
  formatWeekday,
  formatMonth,
} from 'simple-formatter-utility';

const today = new Date();

## Date Format
console.log(formatDate(today, 'id-ID')); // "8/5/2025"
console.log(formatDate(today, 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));  // "Thursday, May 8, 2025"

## Time Format
const now = new Date();
console.log(formatTime(now)); // Output: ex: "10:45 AM" (untuk locale en-US)
console.log(formatTime("2025-05-15T21:30:00", "id-ID")); // Output: "21.30" (for Indonesia, 24 jam format)

## Format Date Time
const now = new Date();
console.log(formatDateTime(now)); // Output: ex: "May 15, 2025 at 10:45:00 AM"
console.log(formatDateTime("2025-05-15T21:30:00", "id-ID")); // Output: "15 May 2025 21.30.00"

### custom
console.log(formatDateTime("2025-05-15T21:30:00", "en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
})); // Output: "Thursday, 15 May 2025 at 21:30"

## Number Format
console.log(formatNumber(1234567.89, 'id-ID')); // "1.234.567,89"

## Format Currency
console.log(formatCurrency(1500000, 'IDR', 'id-ID')); // "Rp1.500.000,00"
console.log(formatCurrency(100, 'USD', 'en-US'));     // "$100.00"

## Format Percent
console.log(formatPercent(0.725, 'id-ID')); // "72,5%"

## Format Duration
console.log(formatDuration(65));      // "00:01:05"
console.log(formatDuration(3661));    // "01:01:01"
console.log(formatDuration(86399));   // "23:59:59"

## Format Relative Time
console.log(formatRelativeTime(new Date(Date.now() - 60000))); // Output: "1 minute ago"
console.log(formatRelativeTime(new Date(Date.now() + 2 * 60 * 60 * 1000))); // Output: "in 2 hours"
console.log(formatRelativeTime("2025-05-10")); // Output: "5 days ago" (if now 2025-05-15)

## Format Compact Number
console.log(formatCompactNumber(1250)); // "1.2K"
console.log(formatCompactNumber(1500000, "id-ID")); // "1,5 jt"

## Format Ordinal Number
console.log(formatOrdinalNumber(1)); // "1st"
console.log(formatOrdinalNumber(2)); // "2nd"
console.log(formatOrdinalNumber(3)); // "3rd"
console.log(formatOrdinalNumber(4)); // "4th"

## Format Weekday
console.log(formatWeekday("2025-05-20")); // "Tuesday"
console.log(formatWeekday("2025-05-20", "id-ID")); // "Selasa"

## Format Month
console.log(formatMonth("2025-05-20")); // "May"
console.log(formatMonth("2025-05-20", "id-ID")); // "Mei"

## Format ISO Date
console.log(formatISODate(new Date())); // "2025-05-20"
console.log(formatISODate("2025-01-01T12:00:00Z")); // "2025-01-01"

## Format File Size
console.log(formatFileSize(1024)); // "1 KB"
console.log(formatFileSize(1048576)); // "1 MB"
console.log(formatFileSize(1500000, "id-ID")); // "1,43 MB"



```

stay tuned for updates on this library
