// @flow
import * as React from 'react';
import { Shape } from './shape';

class LogShape implements Shape {
  width: number;
  height: number;
  value: string;
  history: string[];

  constructor({
    width,
    height,
    value,
    history
  }: {
    width: number,
    height: number,
    value: string,
    history: string[],
  }) {
    this.width = width;
    this.height = height;
    this.history = history;
    this.value = value;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  render() {
    const { value, history } = this;

    const historyText = history.length === 0 ?
      <tspan x="0" dx="1em" dy="1.5em">history: []</tspan> : (
        <React.Fragment>
          <tspan x="0" dx="1em" dy="1.5em">history: [</tspan>
          {history.map((x, i) => (
            <tspan key={i} x="0" dx="2em" dy="1.5em">"{x}",</tspan>
          ))}
          <tspan x="0" dx="1em" dy="1.5em">]</tspan>
        </React.Fragment>
      )

    return (
      <text style={{ fontFamily: 'monospace' }}>
        <tspan>{'{'}</tspan>
        <tspan x="0" dx="1em" dy="1.5em">value: {value},</tspan>
        {historyText}
        <tspan x="0" dx="0" dy="1.5em">{'}'}</tspan>
      </text>
    )
  }
}

export default LogShape;
