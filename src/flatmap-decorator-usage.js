// @flow
import React from 'react';
import makeTextLabel from './_common/make-text-label';
import SideEffect from './_common/side-effect';
import { DEFAULT_ARROW } from './_common/shape-arrow';
import PipeShape, { normalPipe, higherOrderPipe, liftedPipe, inputLiftedPipe } from './_common/shape-pipe';
import renderRow from './_common/render-row';
import SvgContainer from './_common/svg-container';
import LogShape from './_common/shape-log';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  new PipeShape(Object.assign({}, {
    name: 'double',
  }, normalPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'logName',
  }, higherOrderPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double’',
  }, inputLiftedPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'flatMap',
  }, higherOrderPipe)),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double’’',
  }, liftedPipe)),
];

const FlatMapDecorator = () => (
  <SvgContainer height="110px">
    <g transform="translate(1 0)">
      {renderRow(shapes)}
    </g>
  </SvgContainer>
);

export default FlatMapDecorator;
