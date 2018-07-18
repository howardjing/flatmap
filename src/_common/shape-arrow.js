// @flow
import * as React from 'react';
import { Shape } from './shape';

class ArrowShape implements Shape {
  height: number;
  width: number;

  constructor({
    width,
  }: {
    width: number,
  }) {
    this.width = width;
    this.height = 2;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return 0;
  }

  render() {
    return (
      <Arrow height={this.height} width={this.width} />
    );
  }
}

const Arrow = ({
  height,
  width,
}: {
  height: number,
  width: number,
}) => (
  <line x1="0" y1="0" x2={width} y2="0" stroke="#000" strokeWidth={height} markerEnd="url(#arrow)" />
);

const ArrowHead = () => (
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L6,3 z" />
  </marker>
);

const DEFAULT_ARROW = new ArrowShape({ width: 15 });

export default ArrowShape;
export {
  ArrowHead,
  DEFAULT_ARROW,
}
