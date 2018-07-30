// @flow
import * as React from 'react';
import makeTextLabel from './make-text-label';
import { Shape } from './shape';
import { WIDE_ARROW } from './shape-arrow';
import { DEFAULT_MARGIN } from './render-row';
import { sum, centerRelativeTo } from './utils';

const computeOffsets = (shapes: Shape[]) => {
  if (shapes.length < 2) { return null; }
  const currentIndex = shapes.length - 1;
  const prevShapes = shapes.slice(0, currentIndex);
  const prevShapesWidth = prevShapes.map(s => s.getWidth());
  const totalWidth = sum(...prevShapesWidth) + (prevShapes.length * DEFAULT_MARGIN);
  const currentShape = shapes[currentIndex];
  const xOffset = (currentShape.getWidth() / 2) + totalWidth;

  const maxHeight = Math.max(...prevShapes.map(s => s.getHeight()));
  const yOffset = centerRelativeTo(currentShape.getHeight(), maxHeight) + currentShape.getHeight();

  return {
    xOffset,
    yOffset,
  }
};

export default computeOffsets;

