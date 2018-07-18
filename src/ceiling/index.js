// @flow
import React from 'react';
import makeTextLabel from '../_common/make-text-label';
import { DEFAULT_ARROW } from '../_common/shape-arrow';
import PipeShape, { normalPipeDimensions } from '../_common/shape-pipe';
import renderRow from '../_common/render-row';
import SvgContainer from '../_common/svg-container';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  makeTextLabel("10.4", {
    width: 43,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'ceiling',
  }, normalPipeDimensions)),
  DEFAULT_ARROW,
  makeTextLabel("11", {
    width: 24,
    fontSize: LABEL_FONT_SIZE,
  }),
];

const Ceiling = () => (
  <SvgContainer height="55px">
    {renderRow(shapes)}
  </SvgContainer>
);

export default Ceiling;
