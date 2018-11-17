export function $t(text, ...args) {
  args.forEach((arg) => {
    text = text.replace('%{}', arg);
  });
  return text;
}

$t.number = (value) => value.toFixed();

$t.currency = (value) => `${value.toFixed()} $`;

$t.date = (value) => JSON.stringify(value).substr(0, 10);

$t.time = (value) => JSON.stringify(value).substr(11, 5);

$t.timestamp = (value) => `${$t.date(value)} ${$t.time(value)}`;
