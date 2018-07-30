// @flow
import React from 'react';
import makeTextLabel from './_common/make-text-label';
import SideEffect from './_common/side-effect';
import { DEFAULT_ARROW, DEFAULT_WRONG_ARROW } from './_common/shape-arrow';
import PipeShape, { liftedPipe, inputLiftedPipe } from './_common/shape-pipe';
import renderRow from './_common/render-row';
import SvgContainer from './_common/svg-container';
import LogShape from './_common/shape-log';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  new LogShape({
    width: 92,
    height: 82,
    value: "3.5",
    history: [
      "fondue",
    ],
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'ceiling',
  }, liftedPipe)),
  DEFAULT_ARROW,
  new LogShape({
    width: 92,
    height: 102,
    value: "4",
    history: [
      "fondue",
      "ceiling called"
    ],
  }),
];


const AddOneManual = () => (
  <SvgContainer height="130px">
    {renderRow(shapes)}
  </SvgContainer>
);

export default AddOneManual;
