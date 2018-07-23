import * as React from 'react';
import makeTextLabel from './make-text-label';
import { Shape } from './shape';
import { WIDE_ARROW } from './shape-arrow';
import { DEFAULT_MARGIN } from './render-row';
import { sum } from './utils';

const SideEffect = ({ shapes, label, labelWidth }: {
  shapes: Shape[],
  label: string,
  labelWidth: number,
}) => {
  if (shapes.length < 2) { return null; }
  const currentIndex = shapes.length - 1;
  const prevShapes = shapes.slice(0, currentIndex);
  const prevShapesWidth = prevShapes.map(s => s.getWidth());
  const totalWidth = sum(...prevShapesWidth) + (prevShapes.length * DEFAULT_MARGIN);
  const currentShape = shapes[currentIndex];
  const xOffset = (currentShape.getWidth() / 2) + totalWidth;
  const yOffset = currentShape.getHeight() - 1;
  const textLabel = makeTextLabel(label, {
    width: labelWidth,
    fontSize: '12px',
    alignmentBaseline: 'baseline',
  });

  const labelXOffset = -textLabel.getWidth() / 2;
  const labelYOffset = WIDE_ARROW.getWidth() + 20;

  return (
    <g transform={`translate(${xOffset} ${yOffset})`}>
      <g transform="rotate(90)">
        {WIDE_ARROW.render()}
      </g>
      <g transform={`translate(${labelXOffset} ${labelYOffset})`}>
        {textLabel.render()}
      </g>
    </g>
  );
};

export default SideEffect;
