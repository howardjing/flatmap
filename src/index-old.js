// @flow
import * as d3 from 'd3';
import { TweenLite } from 'gsap/TweenLite';
import CSSPlugin from 'gsap/CSSPlugin';

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
  const p = d3.select("#app")
  .selectAll("p")
  .data(data)
  .text(renderDigit)

  p.transition()
    .duration(1000)
    .style('color', 'purple');

  console.log("HEY P", p)

  p.enter()
    .append("p")
    .text(renderDigit)
    .transition()
    .duration(1000)
    .style('opacity', 1)
    .style('color', 'green')
    // .each(function() {
    //   TweenLite.to(this, 1, { height: '30px', opacity: 1 });
    // });

  p.exit()
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .style('color', 'orange')
    .remove()

    // i think this is executed after it's been removed from DOM?
    // .each(function() {
    //   console.log("EXIT", this)
    //   TweenLite.to(this, 1, { height: '20px', opacity: 0 });
    // });
}


render(someNumbers());

// d3.interval(() => rener(someNumbers()), 2000);
