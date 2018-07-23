// @flow
import React from 'react';
import makeTextLabel from '../_common/make-text-label';
import SideEffect from '../_common/side-effect';
import { DEFAULT_ARROW } from '../_common/shape-arrow';
import PipeShape, { normalPipe } from '../_common/shape-pipe';
import renderRow from '../_common/render-row';
import SvgContainer from '../_common/svg-container';

const LABEL_FONT_SIZE = '24px';

const shapes = [
  makeTextLabel("5.2", {
    width: 30,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'double',
  }, normalPipe)),
  DEFAULT_ARROW,
  makeTextLabel("10.4", {
    width: 43,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'ceiling',
  }, normalPipe)),
  DEFAULT_ARROW,
  makeTextLabel("11", {
    width: 24,
    fontSize: LABEL_FONT_SIZE,
  }),
  DEFAULT_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'addOne',
  }, normalPipe)),
  DEFAULT_ARROW,
  makeTextLabel("12", {
    width: 24,
    fontSize: LABEL_FONT_SIZE,
  }),
];

const pipes = [
  { position: 3, label: "double called", },
  { position: 7, label: "addOne called", },
  { position: 11, label: "addOne called", },
]

const ComposeNormal1 = () => (
  <SvgContainer height="110px">
    {renderRow(shapes)}
    {pipes.map(({ position, label }) => (
      <SideEffect
        key={position}
        shapes={shapes.slice(0, position)}
        label={label}
        labelWidth={60}
      />
    ))}
  </SvgContainer>
);

export default ComposeNormal1;
