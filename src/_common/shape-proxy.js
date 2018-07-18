// @flow
import * as React from 'react';
import { Shape } from './shape';

class ProxyShape implements Shape {
  width: number;
  height: number;
  node: React.Node;

  constructor({
    width,
    height,
    node,
  }: {
    width: number,
    height: number,
    node: React.Node,
  }) {
    this.width = width;
    this.height = height;
    this.node = node;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  render() {
    return this.node;
  }
}

export default ProxyShape;
