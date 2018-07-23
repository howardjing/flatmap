// @flow
import React from 'react';
import makeTextLabel from '../_common/make-text-label';
import SideEffect from '../_common/side-effect';
import { DEFAULT_ARROW } from '../_common/shape-arrow';
import PipeShape, { normalPipe, higherOrderPipe } from '../_common/shape-pipe';
import renderRow from '../_common/render-row';
import SvgContainer from '../_common/svg-container';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  new PipeShape(Object.assign({}, {
    name: 'double',
  }, normalPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'traceCall',
  }, higherOrderPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double\'',
  }, normalPipe)),
];

const pipeIndex = 4;

const DoubleAltered = () => (
  <SvgContainer height="110px">
    <g transform="translate(1 0)">
      {renderRow(shapes)}
      <SideEffect
        shapes={shapes.slice(0, pipeIndex + 1)}
        label="double called"
        labelWidth={60}
      />
    </g>
  </SvgContainer>
);

export default DoubleAltered;
