// @flow
import React from 'react';
import makeTextLabel from './_common/make-text-label';
import SideEffect from './_common/side-effect';
import { DEFAULT_ARROW } from './_common/shape-arrow';
import PipeShape, { normalPipe, higherOrderPipe, liftedPipe, inputLiftedPipe } from './_common/shape-pipe';
import renderRow from './_common/render-row';
import SvgContainer from './_common/svg-container';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  new PipeShape(Object.assign({}, {
    name: 'fn',
  }, normalPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'stage 1',
  }, higherOrderPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'fn’',
  }, inputLiftedPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'stage 2: flatMap',
  }, higherOrderPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'fn’’',
  }, liftedPipe))
];

const pipeIndex = 4;

const MapDecomposed = () => (
  <SvgContainer height="110px">
    <g transform="translate(1 0)">
      {renderRow(shapes)}
    </g>
  </SvgContainer>
);

export default MapDecomposed;
