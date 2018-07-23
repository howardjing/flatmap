// @flow
import React from 'react';
import makeTextLabel from '../_common/make-text-label';
import SideEffect from '../_common/side-effect';
import { DEFAULT_ARROW } from '../_common/shape-arrow';
import PipeShape, { normalPipeDimensions } from '../_common/shape-pipe';
import renderRow from '../_common/render-row';
import SvgContainer from '../_common/svg-container';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  makeTextLabel("5", {
    width: 13,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double',
  }, normalPipeDimensions)),
  DEFAULT_ARROW,
  makeTextLabel("10", {
    width: 25,
    fontSize: LABEL_FONT_SIZE,
  }),
];

const pipeIndex = 2;

const DoubleAltered = () => (
  <SvgContainer height="110px">
    {renderRow(shapes)}
    <SideEffect
      shapes={shapes.slice(0, pipeIndex + 1)}
      label="double called"
      labelWidth={60}
    />
  </SvgContainer>
);

export default DoubleAltered;
