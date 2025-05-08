## simple-formatter-utility

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
  formatPercent
} from 'simple-formatter-utility';

const today = new Date();

// Date Format
console.log(formatDate(today, 'id-ID')); // "8/5/2025"
console.log(formatDate(today, 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
// "Thursday, May 8, 2025"

// Number Format
console.log(formatNumber(1234567.89, 'id-ID')); // "1.234.567,89"

// Format Currency
console.log(formatCurrency(1500000, 'IDR', 'id-ID')); // "Rp1.500.000,00"
console.log(formatCurrency(100, 'USD', 'en-US'));     // "$100.00"

// Format Percent
console.log(formatPercent(0.725, 'id-ID')); // "72,5%"

```

stay tuned for updates on this library