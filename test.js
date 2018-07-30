// const buildLog = (v) => ({ value: v, history: [] })
const unit = (v) => ({ value: v, history: [] })

// const map = (fn, log) => {
//   const { value, history } = log;
//   const newValue = fn(value);
//   const newHistory = [`${fn.name} called`];
//   return {
//     value: newValue,
//     history: history.concat(newHistory),
//   };
// }

const flatMap = (fn, log) => {
  const { value, history } = log;
  const { value: newValue, history: newHistory } = fn(value);
  return {
    value: newValue,
    history: history.concat(newHistory),
  };
}

function f(x) {
  return {
    value: x + 2,
    history: ["+ 2"]
  }
}

function g(x) {
  return {
    value: x * 2,
    history: ["* 2"],
  }
}

[
  // flatMap(f, unit(3)),
  // f(3)
  // flatMap(unit, { value: 2, history: ["some", "stuff"] })
  flatMap(g, flatMap(f, { value: 2, history: ["some", "stuff"] })),
  flatMap(x => flatMap(g, f(x)), { value: 2, history: ["some", "stuff" ]})
].forEach(x => console.log(x))

// const identity = (x) => x;

// console.log(map(identity, buildLog(1)))
// console.log(identity(buildLog(1)))

// const f = (x) => x + 1;
// const g = (x) => x + 2;
// const gThenF = (x) => f(g(x));

// console.log(map(gThenF, buildLog(1)))
// console.log(map(f, map(g, buildLog(1))))


// const flatMapCurried = (g) => {
//   return function(log) {
//     const { value: oldValue, history: oldHistory } = log; // extract our given Log's value and history
//     const { value: newValue, history: newHistory } = g(oldValue); // get a new Log based on oldValue
//     return {
//       value: newValue,
//       history: oldHistory.concat(newHistory), // glue together the two histories
//     };
//   }
// }

// const functorMap = (fn) => {
//   return flatMapCurried(x => buildLog(fn(x)))
// }

// const functorMap2 = (fn, log) => {
//   return flatMap(y => buildLog(fn(y)), log)
// }


// console.log("OKAY", functorMap(identity)({ value: 3, history: ["hh"]}))
// console.log(functorMap2(f, functorMap2(g, buildLog(1))))
// console.log(functorMap2(gThenF, buildLog(1)))
