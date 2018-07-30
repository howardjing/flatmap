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
];

const moreShapes = [
  makeTextLabel("3", {
    width: 13,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double’',
  }, inputLiftedPipe)),
  DEFAULT_ARROW,
  new LogShape({
    width: 155,
    height: 90,
    value: "6",
    history: [
      "double called",
    ],
  }),
];


const LogNameDecorator = () => (
  <SvgContainer height="310px">
    <g transform="translate(1 0)">
      {renderRow(shapes)}
    </g>
    <g transform="translate(1 130)">
      {renderRow(moreShapes)}
    </g>
  </SvgContainer>
);

export default LogNameDecorator;
