// @flow
import * as React from 'react';
import ProxyShape from './shape-proxy';

const makeTextLabel = (label: string, { width, fontSize, alignmentBaseline = 'middle' }: {
  width: number,
  fontSize: string,
  alignmentBaseline?: string,
}) => new ProxyShape({
  width,
  height: 0,
  node: (
    <text fill="black" alignmentBaseline={alignmentBaseline} style={{fontSize: fontSize}}>
      {label}
    </text>
  )
});

export default makeTextLabel;
