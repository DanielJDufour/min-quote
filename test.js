const test = require("flug");
const minQuote = require("./min-quote");

test("quote-free string", ({ eq }) => {
  const quoted = minQuote("The cow jumped over the moon");
  eq(quoted, "'The cow jumped over the moon'");
});

test("single-quote", ({ eq }) => {
  const quoted = minQuote("It's awesome.");
  eq(quoted, `"It's awesome."`);
});

test("multi-level", ({ eq }) => {
  const quoted = minQuote(`"Don't count the days, make the days count." - Muhammad Ali`);
  eq(quoted, `\`"Don't count the days, make the days count." - Muhammad Ali\``);
});

test("fallback", ({ eq }) => {
  const quoted = minQuote(`It's saying "backtick is \`"`, { debug: false });
  eq(quoted, '\'It\\\'s saying "backtick is `"\'');
});

test("multiple", ({ eq }) => {
  const quoted = minQuote(`It's what it's.`, { debug: false });
  eq(quoted, "\"It's what it's.\"");
});

test("multiple backtick", ({ eq }) => {
  const quoted = minQuote(`It's what it's.  Here's a quote "bla bla bla".`, { backtick: true, debug: false });
  eq(quoted, "`It's what it's.  Here's a quote \"bla bla bla\".`");
});

test("quote backticks", ({ eq }) => {
  const quoted = minQuote(`It's what it's. \` \` "'"'"'"'"'`, { backtick: true, debug: false });
  eq(quoted, "`It's what it's. \\` \\` \"'\"'\"'\"'\"'`");
});


