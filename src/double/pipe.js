// @flow
import * as React from 'react';

const centerRelativeTo = (self: number, relativeTo: number): number => Math.max((relativeTo - self) / 2, 0);
const sum = (...lengths: number[]): number => lengths.reduce((partial, next) => partial + next, 0);

const ArrowHead = () => (
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L6,3 z" />
  </marker>
);

interface Shape {
  +getWidth: () => number;
  +getHeight: () => number;
  +render: () => React.Node;
}

class ArrowShape {
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

class ProxyShape {
  +width: number;
  +height: number;
  +node: React.Node;

  constructor({
    width,
    height,
    node,
  }: {
    width: number,
    height: number,
    node: React.Node,
  }) {
    this.width = width;
    this.height = height;
    this.node = node;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  render() {
    return this.node;
  }
}

class PipeShape {
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

const renderRow = (shapes: Shape[]): React.Node[] => {
  const heights = shapes.map(s => s.getHeight());
  const maxHeight = Math.max(...heights);
  const marginWidth = 15;

  return shapes.reduce(({ xOffset, renderedShapes }, s) => {
    const yOffset = centerRelativeTo(s.getHeight(), maxHeight);
    const rendered = (
      <g key={xOffset} transform={`translate(${xOffset} ${yOffset})`}>
        {s.render()}
      </g>
    )
    return ({
      xOffset: xOffset + s.getWidth() + marginWidth,
      renderedShapes: renderedShapes.concat([rendered]),
    })
  }, {
    xOffset: 0,
    renderedShapes: [],
  }).renderedShapes;
};

const Arrow = ({
  height,
  width,
}: {
  height: number,
  width: number,
}) => (
  <line x1="0" y1="0" x2={width} y2="0" stroke="#000" strokeWidth={height} markerEnd="url(#arrow)" />
);

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
      x={edgeWidth + 10} y={bodyHeightOffset - 2} fill="black" style={{fontSize: "16px"}}
    >{name}</text>
  ) : null;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const Stuff = () => {
  const pipe = {
    width: {
      body: 100,
      edge: 10,
    },
    height: {
      body: 50,
      edge: 60,
    }
  };

  const bodyHeightOffset = (pipe.height.edge - pipe.height.body) / 2;

  const mainPipeWidth = 100;

  const verticalOffset = (pipe.height.edge / 2) + 8;

  const makeLabel = (label: string) => new ProxyShape({
    width: 14,
    height: 0,
    node: (
      <text fill="black" alignmentBaseline="middle" style={{fontSize: "24px"}}>
        {label}
      </text>
    )
  });

  const arrow = new ArrowShape({ width: 15 });

  const xs = renderRow([
    makeLabel("4"),
    arrow,
    new PipeShape({
      name: 'double',
      leftHeight: 40,
      bodyWidth: 80,
      bodyHeight: 30,
      rightHeight: 40,
    }),
    arrow,
    makeLabel("8"),
    arrow,
    new PipeShape({
      name: 'addOne',
      leftHeight: 40,
      bodyWidth: 80,
      bodyHeight: 30,
      rightHeight: 40,
    }),
    arrow,
    makeLabel("9"),
  ]);

  return (
    <svg style={{width: '100%'}}>
      <defs>
        <ArrowHead />
      </defs>
      <g transform="translate(0 10)">
        {xs}
      </g>

      <g transform="translate(130 80)">
        <Pipe leftHeight={60} edgeWidth={10} bodyWidth={100} bodyHeight={30} rightHeight={40} name="foo" />
      </g>

      <g transform="translate(0 80)">
        <Pipe leftHeight={60} edgeWidth={10} bodyWidth={100} bodyHeight={50} rightHeight={60} name="bar" />
      </g>
    </svg>
  )
}

export default Stuff;
