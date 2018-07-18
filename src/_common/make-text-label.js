// @flow
import * as React from 'react';
import ProxyShape from './shape-proxy';

const makeTextLabel = (label: string, { width, fontSize }: {
  width: number,
  fontSize: string,
}) => new ProxyShape({
  width,
  height: 0,
  node: (
    <text fill="black" alignmentBaseline="middle" style={{fontSize: fontSize}}>
      {label}
    </text>
  )
});

export default makeTextLabel;
