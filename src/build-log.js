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
  makeTextLabel("5", {
    width: 13,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'buildLog',
  }, inputLiftedPipe)),
  DEFAULT_ARROW,
  new LogShape({
    width: 92,
    height: 52,
    value: "5",
    history: [
    ],
  }),
];


const BuildLog = () => (
  <SvgContainer height="100px">
    {renderRow(shapes)}
  </SvgContainer>
);

export default BuildLog;
