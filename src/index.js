// @flow
import * as d3 from 'd3';

const numberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min + 1;

const renderDigit = (d: number) => `I'm number ${d}!`;

const someNumbers = (): number[] => {
  const numbers = [];
  for (let i = 0; i < numberBetween(5, 10); i++) {
    numbers.push(numberBetween(1, 100));
  }

  return numbers;
}

const render = (data: number[]) => {
  const p = d3.select("body")
  .selectAll("p")
  .data(data)
  .text(renderDigit);

  p.enter()
    .append("p")
    .text(renderDigit);

  p.exit()
    .remove();
  }

render(someNumbers());

setInterval(() => render(someNumbers()), 1000);
