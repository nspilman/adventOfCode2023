const input = await Bun.file("./input/A.txt");
const inputB = await Bun.file("./input/B.txt");
const data = (await input.text()).split("\n");
const dataB = (await inputB.text()).split("\n");

// Part 1
const result = data
  .map((row) => row.split("").filter((char) => !isNaN(Number(char))))
  .map((row) => {
    const length = row.length;
    return Number(row[0] + row[length - 1]);
  })
  .reduce((prev, current) => prev + current, 0);

// Part 2
const digitStrings = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;
const digitStringMapping: Record<(typeof digitStrings)[number], number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

const findFirstNumber = (val: string, reverse?: "reverse") => {
  let current = "";
  const chars = reverse
    ? val.toLowerCase().split("").reverse()
    : val.toLowerCase().split("");

  for (const char of chars) {
    if (!isNaN(Number(char))) {
      return char;
    }
    current = reverse ? char + current : current + char;
    const found = digitStrings.find((string) => current.includes(string));
    if (found) {
      return digitStringMapping[
        found as (typeof digitStrings)[number]
      ].toString();
    }
  }
  throw new Error(
    "Input error, unreachable - Did not find a single number in the string"
  );
};

const result2 = data
  .map((row) =>
    "".concat(findFirstNumber(row), findFirstNumber(row, "reverse"))
  )
  .reduce((prev, curr) => prev + JSON.parse(curr), 0);

console.log({ result2 });
