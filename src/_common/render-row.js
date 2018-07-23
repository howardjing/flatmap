// @flow
import * as React from 'react';
import { Shape } from './shape';
import { centerRelativeTo } from './utils';

const DEFAULT_MARGIN = 15;

const renderRow = (shapes: Shape[]): React.Node[] => {
  const heights = shapes.map(s => s.getHeight());
  const maxHeight = Math.max(...heights);
  const marginWidth = DEFAULT_MARGIN;

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

export default renderRow;
export {
  DEFAULT_MARGIN,
}
