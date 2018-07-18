// @flow
import * as React from 'react';
import { centerRelativeTo, sum } from './utils';
import { Shape } from './shape';

class PipeShape implements Shape {
  edgeWidth: number;
  leftHeight: number;
  bodyWidth: number;
  bodyHeight: number;
  rightHeight: number;
  name: string | void;

  constructor({
    leftHeight,
    bodyWidth,
    bodyHeight,
    rightHeight,
    name,
  }: {
    leftHeight: number,
    bodyWidth: number,
    bodyHeight: number,
    rightHeight: number,
    name?: string,
  }) {
    this.edgeWidth = 10;
    this.leftHeight = leftHeight;
    this.bodyWidth = bodyWidth;
    this.bodyHeight = bodyHeight;
    this.rightHeight = rightHeight;
    this.name = name;
  }

  getWidth() {
    return this.edgeWidth * 2 + this.bodyWidth;
  }

  getHeight() {
    return Math.max(this.leftHeight, this.rightHeight, this.bodyHeight);
  }

  render() {
    return (
      <Pipe
        edgeWidth={this.edgeWidth}
        leftHeight={this.leftHeight}
        bodyWidth={this.bodyWidth}
        bodyHeight={this.bodyHeight}
        rightHeight={this.rightHeight}
        name={this.name}
      />
    );
  }
}

const Pipe = ({
  edgeWidth,
  leftHeight,
  bodyWidth,
  bodyHeight,
  rightHeight,
  name,
}: {
  edgeWidth: number,
  leftHeight: number,
  bodyWidth: number,
  bodyHeight: number,
  rightHeight: number,
  name?: string,
}) => {
  const leftHeightOffset = centerRelativeTo(leftHeight, rightHeight);
  const bodyHeightOffset = centerRelativeTo(bodyHeight, Math.max(leftHeight, rightHeight));
  const rightHeightOffset = centerRelativeTo(rightHeight, leftHeight);
  const label = name ? (
    <text
      alignmentBaseline="baseline"
      x={edgeWidth + 10} y={bodyHeightOffset - 6} fill="black" style={{fontSize: "16px"}}
    >{name}</text>
  ) : null;

  return (
    <g transform="translate(0 3)">
      <rect
        x="0"
        y={leftHeightOffset}
        width={edgeWidth}
        height={leftHeight}
        fill="pink"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="butt"
      />
      {label}
      <rect
        x={edgeWidth}
        y={bodyHeightOffset}
        width={bodyWidth}
        height={bodyHeight}
        fill="pink"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="butt"
      />
      <rect
        x={sum(edgeWidth, bodyWidth)}
        y={rightHeightOffset}
        width={edgeWidth}
        height={rightHeight}
        fill="pink"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="butt"
      />
    </g>
  );
};

const normalPipeDimensions = {
  leftHeight: 40,
  bodyWidth: 80,
  bodyHeight: 30,
  rightHeight: 40,
}


export default PipeShape;
export {
  normalPipeDimensions,
}
