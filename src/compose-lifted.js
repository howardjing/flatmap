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
  makeTextLabel("14.1", {
    width: 42,
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
    value: "14.1",
    history: [
    ],
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double',
  }, liftedPipe)),
  DEFAULT_ARROW,
  new LogShape({
    width: 155,
    height: 90,
    value: "28.2",
    history: [
      "double called",
    ],
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'ceiling',
  }, liftedPipe)),
  DEFAULT_ARROW,
];

const moreShapes = [
  new LogShape({
    width: 155,
    height: 120,
    value: "29",
    history: [
      "double called",
      "ceiling called",
    ],
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'addOne',
  }, liftedPipe)),
  DEFAULT_ARROW,
  new LogShape({
    width: 155,
    height: 130,
    value: "30",
    history: [
      "double called",
      "ceiling called",
      "addOne called",
    ],
  }),
]

const ComposeLifted = () => (
  <SvgContainer height="280px">
    {renderRow(shapes)}
    <g transform="translate(55 130)">
      {renderRow(moreShapes)}
    </g>
  </SvgContainer>
);

export default ComposeLifted;
