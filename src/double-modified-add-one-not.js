// @flow
import React from 'react';
import makeTextLabel from './_common/make-text-label';
import SideEffect from './_common/side-effect';
import { DEFAULT_ARROW, DEFAULT_WRONG_ARROW } from './_common/shape-arrow';
import PipeShape, { inputLiftedPipe, normalPipe } from './_common/shape-pipe';
import renderRow from './_common/render-row';
import SvgContainer from './_common/svg-container';
import ProxyShape from './_common/shape-proxy';

const LABEL_FONT_SIZE = '24px';

const Log = (
  <text style={{ fontFamily: 'monospace' }}>
    <tspan>{'{'}</tspan>
    <tspan x="0" dx="1em" dy="1.5em">value: 6,</tspan>
    <tspan x="0" dx="1em" dy="1.5em">history: [</tspan>
    <tspan x="0" dx="2em" dy="1.5em">"double called",</tspan>
    <tspan x="0" dx="1em" dy="1.5em">]</tspan>
    <tspan x="0" dx="0" dy="1.5em">{'}'}</tspan>
  </text>
);

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
  new ProxyShape({
    width: 155,
    height: 100,
    node: Log,
  }),
  DEFAULT_WRONG_ARROW,
  new PipeShape(Object.assign({}, {
    name: 'addOne',
  }, normalPipe)),
];

const DoubleAltered = () => (
  <div style={{ position: 'relative' }}>
  <SvgContainer height="110px">
    {renderRow(shapes)}
  </SvgContainer>
  </div>
);

export default DoubleAltered;
