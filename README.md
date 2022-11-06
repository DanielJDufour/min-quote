# min-quote
Minimally Quote a String.  Avoid Extra Escape Characters.

## motivation
Code that escapes a quote in a string with a backslash includes an extra character (8 bits).
This library aims to avoid the extra backslash by choosing `"`, `'`, or <code>`</code>
depending on if a quoting character is in the string.  This is especially helpful
if you have a JavaScript file with thousands of strings. 

## install
```bash
npm install min-quote
```

## basic usage
```js
import minQuote from 'min-quote';

minQuote('The cow jumped over the moon');
// 'The cow jumped over the moon'

minQuote("It's awesome.");
// "It's Awesome"

minQuote(`"Don't count the days, make the days count." - Muhammad Ali`);
// `"Don't count the days, make the days count." - Muhammad Ali`
```

## advanced usage
Turn off the use of backticks for quoting:
```js
minQuote(`"Don't count the days, make the days count." - Muhammad Ali`, { backtick: false });
// '"Don\'t count the days, make the days count." - Muhammad Ali'
```
