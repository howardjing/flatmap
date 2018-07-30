// @flow
import React from 'react';
import makeTextLabel from './_common/make-text-label';
import SideEffect from './_common/side-effect';
import { DEFAULT_ARROW, DEFAULT_WRONG_ARROW } from './_common/shape-arrow';
import PipeShape, { inputLiftedPipe, normalPipe } from './_common/shape-pipe';
import renderRow from './_common/render-row';
import SvgContainer from './_common/svg-container';
import LogShape from './_common/shape-log';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  makeTextLabel("3", {
    width: 13,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double',
  }, inputLiftedPipe)),
  DEFAULT_ARROW,
  new LogShape({
    width: 155,
    height: 100,
    value: "6",
    history: [
      "double called",
    ],
  }),
  DEFAULT_WRONG_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'addOne',
  }, normalPipe)),
];

const DoubleAltered = () => (
  <SvgContainer height="110px">
    {renderRow(shapes)}
  </SvgContainer>
);

export default DoubleAltered;
