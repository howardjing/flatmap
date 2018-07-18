// @flow
import * as React from 'react';
import { ArrowHead } from './shape-arrow';

type Props = {
  height: string,
  children: React.Node,
};

class SvgContainer extends React.PureComponent<Props> {
  render() {
    const { children, height } = this.props;
    return (
      <svg style={{ width: '100%', height }}>
        <defs>
          <ArrowHead />
        </defs>
        <g transform="translate(0 10)">
          {children}
        </g>
      </svg>
    );
  }
}

export default SvgContainer;
