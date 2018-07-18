// @flow
import * as React from 'react';

export interface Shape {
  +getWidth: () => number;
  +getHeight: () => number;
  +render: () => React.Node;
}

