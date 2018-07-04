# The Problem

Let's say we have a bunch of functions. For simplicity's sake let's say all of our functions take in a number as input and spit out a number as output.

```
      double
5 -> ======== -> 10

function double(x: number): number {
  return x * 2;
}
```

```
      addOne
6 -> ======== -> 7

function addOne(x: number): number {
  return x + 1;
}
```

```
         ceiling
10.5 -> ========= -> 11

function ceiling(x: number): number {
  return Math.ceil(x);
}
```

Because all of our functions take numbers as input and spit out numbers as output, we can arrange them any way we want:

```
        double              ceiling            addOne            double
5.2 -> ======== -> 10.4 -> ========= -> 11 -> ======== -> 12 -> ======== -> 24

double(addOne(ceiling(double(5.2))))
```

```
        addOne             double              double              ceiling
5.2 -> ======== -> 6.2 -> ======== -> 12.4 -> ======== -> 24.8 -> ========= -> 25


ceiling(double(double(addOne(5.2))))
```

What if we wanted to keep a history of the names of the functions our number passes through as it journeys through our list of functions? There are many ways to do this. One way is to modify all of our functions to log out their name before returning their value.

```js
function double(x: number): number {
  console.log("double was called")
  return x * 2;
}

/**
        double
5.2 -> ===-==== 10.4
          |
          V
     double was called
**/
function addOne(x: number): number {
  console.log("addOne was called")
  return x + 1;
}

function ceiling(x: number): number {
  console.log("ceiling was called")
  return Math.ceil(x);
}
```
# Decorators

This is a little time consuming (and boring). We can abstract this logic out into a function that decorates our existing functions with this logging behavior.

```js
function traceable(f: (number) => number): (number) => number {
  return function(x: number) {
    console.log(`${f.name} was called`);
    return f(x);
  }
}

/*
 addOne      traceable      traceableAddOne
======== -> =========== -> =======-=========

     traceableAddOne
5.2 =======-========= -> 6.2
           |
           V
    traceableAddOne was called
*/

const traceableAddOne = traceable(addOne);
const traceableDouble = traceable(double);
const traceableCeiling = traceable(ceiling);
```

Because the signature of our traceable functions were not altered, we can continue composing them as normal.

```
        traceableAddOne             traceableDouble              traceableDouble              traceableCeiling
5.2 -> ========-======== -> 6.2 -> ==========-====== -> 12.4 -> ========-======== -> 24.8 -> =========-======== -> 25
               |                             |                          |                             |
               V                             V                          V                             V
    traceableAddOne was called    traceableDouble was called  traceableDouble was called      traceableCeiling was called

ceiling(double(double(addOne(5.2)))
```

# Motivation for a Functor

What if we wanted to do something more than log our function calls to the console? For example, what if we wanted to figure out which function was called most frequently? Simply logging to the console doesn't lead to a nice solution because we never track information about previous function calls. To figure out which function was called most frequently, we need a mechanism for storing what functions were previously called. Once we have access to this, figuring out the most commonly seen function is straightforward.

Let's define a `SentimentalNumber` type to start storing this information. We call it sentimental because it keeps a history of function calls that it has passed through.

```js
type SentimentalNumber = {
  value: number,
  history: string[],
};

const sentimentalNumber: SentimentalNumber = {
  value: 5,
  history: ["ceiling was called", "double was called", "addOne was called"],
};
```

This type has two properties -- `value` and `history`. The `value` property is the value of the number this `SentimentalNumber` represents. Here, the value of `sentimentalNumber` is 5. The `history` property is an array of strings, with each string representing a function this `SentimentalNumber` has passed through. In this example, `sentimentalNumber` has passed through three functions -- first `ceiling`, then `double`, and finally `addOne`.

Now that we've defined this type, how do we use it with our existing functions? One option would be to manually modify our existing functions from `(x: number) => number` to `(x: SentimentalNumber) => SentimentalNumber`. By doing this, as long as we have a starting `SentimentalNumber`, we'll be able to compose our sentimental functions with each other just as we would be able to compose our previous functions with plain old numbers.

```js
function sentimentalDouble(sentimental: SentimentalNumber): SentimentalNumber {
  const { value, history } = sentimental;
  return {
    value: value * 2,
    history: history.concat(['sentimentalDouble was called']),
  };
}

function sentimentalAddOne(sentimental: SentimentalNumber): SentimentalNumber {
  const { value, history } = sentimental;
  return {
    value: value + 1,
    history: history.concat(['sentimentalAddOne was called']),
  };
}

function sentimentalCeiling(sentimental: SentimentalNumber): SentimentalNumber {
  const { value, history } = sentimental;
  return {
    value: Math.ceil(value),
    history: history.concat(['sentimentalAddOne was called']),
  };
}
```

We can use these functions like this:

```js
sentimentalCeiling(sentimentalDouble(sentimentalDouble(sentimentalAddOne({ value: 5.2, history: [])))
```

The drawback to this approach is that we've added a bunch of boilerplate. Moreover the boilerplate obfuscates some of the simplicity of our original functions. For example our `addOne` function was purely worried about adding one to  another number. On the other hand `sentimentalAddOne` has to worry about creating a new history item, concatting it with the existing list of history items, and then wrapping the entire result in a new `SentimentalNumber` object. This same boilerplate is repeated over and over through all three functions. We can reduce this boilerplate code with a new abstraction.

We can create a decorator function that transforms functions in the shape of `(number) => number` to `(SentimentalNumber) => SentimentalNumber`. This approach is similar to how we defined a decorator function that took in  a function in the shape of `(x: number) => number` and returned a function in the shape of `(x: number) => number` functions but with some additional `console.log` logic added in beween.

```js
function sentimentalize(f: (x: number) => number): (SentimentalNumber) => SentimentalNumber {
  return function(sentimental: SentimentalNumber) {
    const { value, history } = sentimental;
    return {
      value: f(value),
      history: history.concat([`${f.name} was called`]),
    };
  }
}
```

This `sentimentalize` function encapsulates all of the boilerplate of our previous approach. Here is how we can use it.

```js
const sentimentalDouble = sentimentalize(double);
const sentimentalAddOne = sentimentalize(addOne);
const sentimentalCeiling = sentimentalize(ceiling);

sentimentalCeiling(sentimentalDouble(sentimentalDouble(sentimentalAddOne({ value: 5.2, history: [] })))
```

We've created a decorator function that given a normal function that takes numbers to numbers, returns a new function that takes `SentimentalNumber`s to `SentimentalNumber`s. This decorator function handles the following:

1. extracts out relevant information (i.e. the history and value) from the passed in `SentimentalNumber`
2. calls the original function with the `SentimentalNumber`'s value
3. generates some new history saying that the original function has been called
4. concats this new history with the SentimentalNumber's existing history

TODO: this part is weak -- make it clearer

Here is an interesting claim: our `sentimentalize` function is pretty much Rambda's `map` function. Let's examine the type signatures of both:

```js
// our sentimentalize
sentimentalize: (f: (x: number) => number): SentimentalNumber => SentimentalNumber;

// Rambda map
map: <T, U>(f: (x: T) => U): (Functor<T>) => Functor<U>;
```

You are probably more familiar with `map` as defined in underscore or lodash:

```
map: <T, U>(items: Array<T>, f: (x: T) => U): Array<U>
```

The obvious difference between the two maps is the order of parameters. Where underscore has us pass in a list as the first argument, and a function as the second argument, Rambda has us pass in a function as the first argument and a list as the second argument. This allows us to think of `map` as a decorator function. Similar to how we used `sentimentalize` to automatically turn functions that worked on numbers into functions that worked on `SentimentalNumber`s, we can use `map` to automatically turn functions that operate on numbers into functions that operate on lists. Whenever we can define a `map` with this behavior, we can say that this `map`, along with the type we're working with (i.e. SentimentalNumbers, lists, or arrays) form a Functor. When we say that something is a `Functor`, we know that we can automatically transform a function that goes from `T` to `U`, into a function that goes from `Functor<T>` to `Functor<U>`.

# Motivation for Monads

This is nice -- we've cut down on a lot of boilerplate code and have a straightforward path to finding the most frequently called function. But what if we want to handle the history of some of our function calls differently? For example, what if we wanted every call to `addOne` to register twice? What if we wanted to hide all calls to `double`? What if we wanted to change the wording for calls to `ceiling`? Our `sentimentalize` handles creating history items the same for all functions, namely we create a single new new history item in the format of `${f.name} was called`. To handle the generation of new history items on a per function basis, we need to break apart our `sentimentalize` function -- it's currently doing too many things at once. Our `sentimentalize` function transforms functions in the shape of `(x: number) => number` into functions in the shape of `(x: SentimentalNumber) => SentimentalNumber`. Let's split this single `sentimentalize` functions into two separate steps.

First we will create a new function that transforms functions in the shape of `(x: number) => number` and turns them into functions in the shape of `(x: number) => SentimentalNumber`. This function will allow us to handle our new history items differently based on the original function that was passed in. Once we have this initial function, we will then take the resulting `(x: number) => SentimentalNumber` and transform it into the final function in the shape of `(x: SentimentalNumber) => SentimentalNumber`. This final form will be our new `sentimentalize` and can be thought of as `flatMap` or `bind` in other languages.

## Turning our (x: number) => number into a (x: number) => SentimentalNumber

Let's isolate the history item generating logic of sentimentalize. This new function `makeSentimental` will be responsible for the following:

1. given a number `x`, and a given function `f`, record the result of passing `x` to `f`
2. record the history that `f` was called
3. wrapping the new value and history into a new `SentimentalNumber`

```js
function makeSentimental(f: (x: number) => number) => (number) => SentimentalNumber {
  return function(x: number) {
    const value = f(x);
    const history = [`${f.name} was called`];

    return {
      value,
      history,
    }
  }
}
```

Our resulting function `makeSentimental` is more generally known as `lift`. This is because we're developing a plan to lift up our plain numbers into a fancier `SentimentalNumber`s. Functions fed in to `makeSentimental` will then be passed on to our next helper function.

## Turning our (x: number) => SentimentalNumber into a (x: SentimentalNumber) => SentimentalNumber

The output of `makeSentimental` spits out `SentimentalNumber`s. Now let's figure out how to handle SentimentalNumbers.

```js
function handleSentimental(f: (x: number) => SentimentalNumber): (SentimentalNumber) => SentimentalNumber {
  return function(sentimental: SentimentalNumber) {
    const { value: oldValue, history: oldHistory } = sentimental;
    const { value: newValue, history: newHistory } = f(oldValue);

    return {
      value: newValue,
      history: oldHistory.concat(newHistory),
    };
  }
}
```

We know that our new function is given a `SentimentalNumber` (called `sentimental`) as it's argument. Given that the function `f` only knows how to handle plain numbers, we'll need to extract out `sentimental`'s value, and pass it into `f`. Calling `f` with this value gives us a new `SentimentalNumber`. However this new `SentimentalNumber` does not yet have the history of the old `SentimentalNumber`. To bring it up to speed we concat the old `SentimentalNumber`'s history with the new `SentimentalNumber`'s history. Our `handleSentimental` function is responsible for the following:

1. given an existing `SentimentalNumber` `oldSentimental`, extract out its value and history
2. shove this value into a function that spits out a new `SentimentalNumber` `newSentimental`
3. return a new `SentimentalNumber` with the same value as the `newSentimental` but with the combined histories of `oldSentimental` and `newSentimental`

Our resulting `handleSentimental` function is also known as `flatMap` or `bind`. Feeding a function into this `flatMap` will result in our desired function that can handle `SentimentalNumber`s as inputs and return `SentimentalNumber`s as outputs -- effectively doing the same thing as our `sentimentalize` function. As a result we can use our two new functions as we would our `sentimentalize` function.

```js
const sentimentalDouble = handleSentimental(makeSentimental(double));
const sentimentalAddOne = handleSentimental(makeSentimental(addOne));
const sentimentalCeiling = handleSentimental(makeSentimental(ceiling));

sentimentalCeiling(sentimentalDouble(sentimentalDouble(sentimentalAddOne({ value: 5.2, history: [] })))
```

Admittedly this is more verbose. However, we now have the flexibility of swapping out `makeSentimental` with a different function that shares the same shape. Here is how we can skip calls to `ceiling`.

```js
function skipHistory(f: (x: number) => number): (number) => SentimentalNumber {
  return function(x: number) {
    return {
      value: f(x),
      history: [],
    }
  }
}

const sentimentalCeiling = handleSentimental(skipHistory(ceiling));
```

Here is how we can double count calls to `addOne`.

```js
function countTwice(f: (x: number) => number): (number) => SentimentalNumber {
  return function(x: number) {
    const historyItem = `${f.name} was called`;
    return {
      value: f(x),
      history: [historyItem, historyItem],
    }
  }
}

const sentimentalAddOne = handleSentimental(countTwice(addOne));
```

Because `countTwice`, `skipHistory`, and `makeSentimental` all have the same shape, we can use them interchangeably when working with `handleSentimental`. Here is an example:

```js
function skipHistory(f: (x: number) => number): (number) => SentimentalNumber {
  return function(x: number) {
    return {
      value: f(x),
      history: [],
    }
  }
}

function countTwice(f: (x: number) => number): (number) => SentimentalNumber {
  return function(x: number) {
    const historyItem = `${f.name} was called`;
    return {
      value: f(x),
      history: [historyItem, historyItem],
    }
  }
}

const sentimentalAddOne = handleSentimental(countTwice(addOne));
const sentimentalCeiling = handleSentimental(skipHistory(ceiling));
const sentimentalDouble = sentimentalize(double);

sentimentalCeiling(sentimentalDouble(sentimentalDouble(sentimentalAddOne({ value: 5.2, history: [] })))
```

We've split up `sentimentalize` into two functions. One function cares about generating `SentimentalNumber`s. The other function cares about combining an old `SentimentalNumber` with a new `SentimentalNumber` that it generates. This gives us flexibility in determining how to best generate `SentimentalNumber`s, but it comes at the cost of an extra function call and some extra boilerplate.

# Why does underscore and lodash invert argument order?

Take a look at the following code snippet:

```js
sentimentalCeiling(sentimentalDouble(sentimentalDouble(sentimentalAddOne({ value: 5.2, history: [] })))
```

Languages such as English are read from left to right. As a result, a lot of English speakers will first read the call to `sentimentalCeiling`, then the call to `sentimentalDouble`, another call to `sentimentalDouble`, a call to `sentimentalAddOne`, and finally the initial `SentimentalNumber`. However, the program will be executed from right to left -- the exact opposite of what we just read. The first thing that happens is the instantiation of a new `SentimentalNumber`. The number gets incremented by one, doubled, doubled again, and finally rounded up. The following code snippet might seem more natural to follow than our previous incantation:

```js
new SentimentalNumber(5.2)
  .flatMap(countTwice(addOne))
  .map(double)
  .map(double)
  .flatMap(skipHistory(ceiling));
```

How do we get there? The answer lies in reversing parameter orders. Whereas `sentimentalize` has us first worry about the function, then worry about the data, this approach has us first worry about the data, then worry about the function.

```js
class SentimentalNumber {
  value: number;
  history: string[];

  constructor(value: number, history: string[] = []) {
    this.value = value;
    this.history = history;
  }

  flatMap = (f: (x: number => SentimentalNumber)): SentimentalNumber => {
    const { value: newValue, history: newHistory } = f(this.value);

    return new SentimentalNumber(newValue, this.history.concat(newHistory));
  };

  map = (f: (x: number => number)): SentimentalNumber =>
    this.flatMap((x: number) => new SentimentalNumber(f(x), [`${f.name} was called`]);
}
```

By
