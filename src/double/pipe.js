// @flow
import React, { Fragment } from 'react';

type Props = {
  type: "big" | "small",
};

const centerRelativeTo = (self: number, relativeTo: number): number => Math.max((relativeTo - self) / 2, 0);
const sum = (...lengths: number[]): number => lengths.reduce((partial, next) => partial + next, 0);

const ArrowHead = () => (
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L6,3 z" />
  </marker>
);

const Arrow = ({
  width,
}: {
  width: number,
}) => (
  <line x1="0" y1="0" x2={width} y2="0" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
);

const Pipe = ({
  leftHeight,
  bodyWidth,
  bodyHeight,
  rightHeight,
}: {
  leftHeight: number,
  bodyWidth: number,
  bodyHeight: number,
  rightHeight: number,
}) => {
  const edgeWidth = 10;
  const leftHeightOffset = centerRelativeTo(leftHeight, rightHeight);
  const bodyHeightOffset = centerRelativeTo(bodyHeight, Math.max(leftHeight, rightHeight));
  const rightHeightOffset = centerRelativeTo(rightHeight, leftHeight);

  return (
    <Fragment>
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
    </Fragment>
  );
};

const Stuff = ({ type }: Props) => {
  const pipe = {
    width: {
      body: 100,
      edge: 10,
    },
    height: {
      body: type === "small" ? 30 : 50,
      edge: type === "small" ? 40 : 60,
    }
  };

  const bodyHeightOffset = (pipe.height.edge - pipe.height.body) / 2;

  const mainPipeWidth = 100;

  const verticalOffset = (pipe.height.edge / 2) + 8;
  return (
    <svg>
      <defs>
        <ArrowHead />
      </defs>
      <g>
        <text x="0" y={verticalOffset} fill="black" style={{fontSize: "20px"}}>4</text>
      </g>

      <g transform={`translate(30 ${verticalOffset})`}>
        <Arrow width={50} />
      </g>

      <g transform="translate(100 1)">
        {/* <!-- Simple rect element --> */}
        <Pipe leftHeight={40} bodyWidth={100} bodyHeight={30} rightHeight={60} />
      </g>

      <g transform={`translate(230 ${verticalOffset})`}>
        <Arrow width={50} />
      </g>

      <g>
        <text x={60 + pipe.width.body + 50 + (2 * pipe.width.edge) + 60} y={verticalOffset}
          fill="black" style={{fontSize: "20px"}}>8</text>
      </g>

      <g transform="translate(130 80)">
        {/* <!-- Simple rect element --> */}
        <Pipe leftHeight={60} bodyWidth={100} bodyHeight={30} rightHeight={40} />
      </g>

      <g transform="translate(0 80)">
        {/* <!-- Simple rect element --> */}
        <Pipe leftHeight={60} bodyWidth={100} bodyHeight={50} rightHeight={60} />
      </g>
    </svg>
  )
}

export default Stuff;
