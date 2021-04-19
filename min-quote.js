const minQuote = (str, { debug=false, backtick=true } = { backtick: false, debug: false }) => {
  if (debug) console.log("[min-quote] starting with str:", [str]);
  let quotechars = ["'", '"', "`"];
  let numQuotes = quotechars.length;
  let selection;
  for (let i = 0; i < numQuotes; i++) {
    const char = quotechars[i];
    if (!str.includes(char)) {
      selection = char;
      break;
    }
  }
  let result;
  if (selection) {
    result = selection + str + selection;
  } else {
    // chose the quote that would require the least amount of escaping
    const counts = { "'": 0, '"': 0, "`": 0 };
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === "'" || char === '"' || char === "`") {
        counts[char]++;
      }
    }
    if (debug) console.log("[min-quote] counts:", counts);
    const sortedCounts = Object.entries(counts).sort((a, b) => Math.sign(a[1] - b[1]));
    const minCount = sortedCounts[0][1];
    const candidates = sortedCounts.filter(([char, count]) => count === minCount);
    const notBackticks = candidates.filter(([char, count]) => char !== "`");
    if (notBackticks.length >= 1) selection = notBackticks[0][0];
    else selection = candidates[0][0];
    if (debug) console.log("[min-quote] selection:", selection);
    result = selection + str.replace(selection, "\\" + selection) + selection;
  }
  return result;
};

if (typeof module === "object") module.exports = minQuote;
if (typeof window === "object") window.minQuote = minQuote;
if (typeof self === "object") self.minQuote = minQuote;