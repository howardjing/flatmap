// @flow

const centerRelativeTo = (self: number, relativeTo: number): number => Math.max((relativeTo - self) / 2, 0);
const sum = (...lengths: number[]): number => lengths.reduce((partial, next) => partial + next, 0);

export {
  centerRelativeTo,
  sum,
};
