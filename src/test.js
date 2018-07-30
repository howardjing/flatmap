// @flow
class Log<U> {
  value: U;
  history: string[];

  constructor(u: U, history: string[] = []) {
    this.value = u;
    this.history = history;
  }

  // our unit function
  static build(u: U): this {
    return new this(u);
  }

  flatMap<V>(fn: (u: U) => Log<V>): Log<V> {
    const { value, history } = this;
    const { value: newValue, history: newHistory } = fn(value);
    return new Log(newValue, history.concat(newHistory));
  }
}

function logName<U, V>(f: U => V): (U) =>Log<V> {
  return function(u: U) {
    return new Log(f(u), [`${f.name} called`]);
  }
}

function double(x) { return x * 2; }
function addOne(x) { return x + 1; }

const x = Log.build(1)
  .flatMap(logName(addOne))
  .flatMap(logName(double))
  .flatMap(x => new Log(x + 100, ["a mystery"]))
console.log("HI TEST", x)
