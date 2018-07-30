// @flow
import * as React from 'react';
import { Shape } from './shape';

class ArrowShape implements Shape {
  height: number;
  width: number;
  incorrect: boolean;

  constructor({
    width,
    incorrect = false,
  }: {
    width: number,
    incorrect?: boolean,
  }) {
    this.width = width;
    this.height = 2;
    this.incorrect = incorrect;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return 0;
  }

  render() {
    return (
      <Arrow height={this.height} width={this.width} incorrect={this.incorrect} />
    );
  }
}

const Arrow = ({
  height,
  width,
  incorrect,
}: {
  height: number,
  width: number,
  incorrect: boolean,
}) => (
  <React.Fragment>
    <line x1="0" y1="0" x2={width} y2="0" stroke="#000" strokeWidth={height} markerEnd="url(#arrow)" />
    {incorrect ? <line x1="0" y1="10" x2={width} y2="-10" stroke="#000" strokeWidth={height} /> : null}
  </React.Fragment>
);

const ArrowHead = () => (
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L6,3 z" />
  </marker>
);

const DEFAULT_ARROW = new ArrowShape({ width: 15 });
const DEFAULT_WRONG_ARROW = new ArrowShape({ width: 15, incorrect: true });
const WIDE_ARROW = new ArrowShape({ width: 30 });

export default ArrowShape;
export {
  ArrowHead,
  DEFAULT_ARROW,
  DEFAULT_WRONG_ARROW,
  WIDE_ARROW,
}
