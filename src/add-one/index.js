// @flow
import React from 'react';
import makeTextLabel from '../_common/make-text-label';
import { DEFAULT_ARROW } from '../_common/shape-arrow';
import PipeShape, { normalPipe } from '../_common/shape-pipe';
import renderRow from '../_common/render-row';
import SvgContainer from '../_common/svg-container';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  makeTextLabel("6", {
    width: 13,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'addOne',
  }, normalPipe)),
  DEFAULT_ARROW,
  makeTextLabel("7", {
    width: 13,
    fontSize: LABEL_FONT_SIZE,
  }),
];

const AddOne = () => (
  <SvgContainer height="55px">
    {renderRow(shapes)}
  </SvgContainer>
);

export default AddOne;
