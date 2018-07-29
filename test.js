const buildLog = (v) => ({ value: v, history: [] })

const map = (fn, log) => {
  const { value, history } = log;
  const newValue = fn(value);
  const newHistory = [`${fn.name} called`];
  return {
    value: newValue,
    history: history.concat(newHistory),
  };
}

const flatMap = (fn, log) => {
  const { value, history } = log;
  const { newValue, newHistory } = fn(value);
  return {
    value: newValue,
    history: history.concat(newHistory),
  };
}
const identity = (x) => x;

console.log(map(identity, buildLog(1)))
console.log(identity(buildLog(1)))

const f = (x) => x + 1;
const g = (x) => x + 2;
const gThenF = (x) => f(g(x));

console.log(map(gThenF, buildLog(1)))
console.log(map(f, map(g, buildLog(1))))
