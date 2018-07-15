# A Whirlwind Tour of Map, Filter, and FlatMap

One thing I hated when learning to program was loops. Loops are repetitive. Most of the time all you're really doing is iterating through elements of a list, performing some transformation on them, and then shoving the result into another list. You can only do this so many times before you lose your mind. Luckily, there is a better way.

## Some Background -- List World

TODO: insert diagram showing oval with triangles with various hatch fills inside

In the above diagram we see an oval. Inside the oval are triangles filled with various hatch marks. The first triangle is filled with vertical hatching. The second triangle is filled with horizontal hatching. Let's consider the oval a list, and each triangle an element of that list. Let's consider the topmost triangle the first element of the list, and the bottommost triangle the last element of the list. Unbeknownst to us, this list has super powers. They are `map`, `filter`, and `flatMap`.

## Map

Suppose our boss assigns us the following task: "I want you to take this list of triangles, and I want you to turn it into a list of squares. Make sure you preserve the direction of the hatching!" After some hard work, we come up with a triangle transmogrifier.

TODO: insert diagram showing `transmogrifyTriangle(triangle) -> square`

Let's see it in action.

TODO: insert diagram showing examples of `transmogrifyTriangle`

Success! We've transmogrified the triangle into a square, all while preserving hatching. How can we complete our task? This is one approach:

```js
const squares = [];
triangles.forEach((triangle) => {
  const square = transmogrifyTriangle(triangle);
  squares.push(circle);
});
```

Once it finishes running, we'll have the desired list of squares. Can we do this more concisely? Yes, using `map`.

TODO: insert diagram showing `map<T, U>(list: List<T>, mapper(t: T) => U): List<U>`

This is the map function. It takes two parameters. The first is a list of things. In our case it is our list of triangles. The second parameter is a function that will be applied to each element of that list. In our case it is `transmogrifyTriangle`. Each time `transmogrifyTriangle` is applied to an element of our list, the resulting square will be captured in a results array. When `map` is finished, we get the transformed list of squares as desired. Let's do a step by step walk through.

TODO: insert step by step run through of map.

Here is our usage of map:

```js
const squares = map(triangles, (triangle) => transmogrifyTriangle(triangle));
```

or even simpler:

```js
const squares = map(triangles, transmogrifyTriangle);
```

By using `map` instead of a loop we've become more concise. We've abstracted the pattern of looping through something, running a function against each element, and returning the accumulated results. Here is how one might implement `map` by hand.

```js
const map = (list, mapper) => {
  const results = [];
  list.forEach((thing) => {
    const result = mapper(thing);
    results.push(result);
  });

  return results;
};
```

Notice how similar it is in structure to how we originally generated the list of squares. Instead of verbosely looping through a list to transform each value of that list into another value, let's use the more concise `map`.

## Filter

"Great work," your boss says. "But it turns out some of our squares are defective. We only sell squares with hatching oriented at an even angle, not at an odd angle. To think otherwise would be absurd. I'm going to need you to throw away all of our oddly hatched squares." After much thought, we come up with an evenness divinator.

TODO: insert diagram showing `isEven(square) -> boolean`

Our evenness divinator is very wise. If it is given a shape with even angled hatch marks, it will say, "True". If it is given a shape with odd angled hatch marks, it will say, "False." How can we use our divinator to only include evenly hatched squares? Here is one approach:


```js
const evenlyHatchedSquares = [];
squares.forEach((square) => {
  if (isEven(square)) {
    evenlyHatchedSquares.push(square);
  }
});
```

Once it finished running, we'll have our list of evenly hatched squares. Can we do this more concisely? Yes, using `filter`.

TODO: insert diagram showing `map<T>(list: List<T>, predicate(t: T) => boolean): List<T>

Like `map`, filter also takes two parameters. The first is our list. The second is a predicate function, in our case our evenness divinator. `Filter` filters out all elements in our list that the predicate function returns `false` for. Let's see it in action.

TODO: insert step by step run through of filter.

Here is how we can use filter:

```js
const evenlyHatchedSquares = filter(squares, (square) => isEven(square));
```

By using `filter` we've abstracted the pattern of looping through something, only keeping values that pass a certain criteria we have. Here is how one might implement `filter` by hand.

```js
const filter = (list, predicate) => {
  const filtered = [];
  list.forEach((thing) => {
    if (predicate(thing)) {
      filtered.push(thing);
    }
  });

  return filtered;
};
```

Instead of manually looping through our list each time we need to filter out some data, let's stick with the more concise `filter`.

## FlatMap

"Amazing!," your boss says. "But throwing away so many oddly hatched squares has proven wasteful. We need to streamline our process. For every evenly hatched triangle we put in, we need to output three evenly hatched squares!" This request perplexes us. Our triangle transmogrifier takes one triangle and transmogrifies it into one square. Where will the other two squares come from? After some divine inspiration, we create a square summoner. This square summoner takes one triangle as input, and summons a list of three squares as output.

TODO: insert diagram showing `summonSquares(triangle) -> List<square>`

Let's see it in action.

TODO: insert diagram showing examples of `summonSquares`

This square summoner is quite interesting. Unlike the triangle transmogrifier, which returns a single square, the square summoner returns a list of three squares. Much more efficient! Here is one way we can use it:

```js
const efficientSquares = [];
triangles.forEach((triangle) => {
  const squares = summonSquares(triangle);
  squares.forEach((square) => {
    efficientSquares.push(square);
  });
});
```

Can we do this more concisely? Our first instinct might be to use `map`. `Map` applies a function to every element of a list, which is what we'll ultimately need to do in the case too. Let's see what happens:

```js
const efficientSquares = map(triangles, (triangle) => summonSquares(triangle));
```

TOOD: insert diagram showing nested list of squares

Unfortunately this result is not quite right. We've correctly managed to generate our squares but they're nested inside a list of lists. Rather than accumulating our results in another list, we'd like to concatenate our results together. Luckily there is a function that does just that: `flatMap`. Here is what it looks like:

TODO: insert diagram showing `flatMap<T, U>(list: List<T>, mapper(t: T) => List<U>): List<U>`

Like `map` and `filter`, `flatMap` also takes two arguments. The first is the list we're operating on. The second is a mapper function that will be applied to every element of our list. The results are concatted together, and the end result is the combined list of results. The mapper function of `flatMap` differs from the mapper function of `map` in that while `map`'s mapper function can return anything you want, `flatMap`'s mapper function must return another list.

Here is `flatMap` in action:

TOOD: insert diagram showing examples of flatMap

We can use it like this:

```js
const efficientSquares = flatMap(triangles, (triangle) => summonSquares(triangle));
```

or more concisely:

```js
const efficientSquares = flatMap(triangles, summonSquares);
```

Here is how one might implement `flatMap` by  hand:

```js
const flatMap = (list, mapper) => {
  const results = [];
  list.forEach((item) => {
    mapper(item).forEach((mappedItem) => {
      results.push(mappedItem);
    });
  });

  return results;
};
```

One might wonder why they would ever need to use `flatMap`. The requirement for the `mapper` function is much more specific in `flatMap` than it is in `map`. The `mapper` of `flatMap` is constrained to only ever return a list of things, whereas the `mapper` of `map` is free to be whatever it wants. Somewhat counterintuitively, the constraint in `flatMap` makes it a bit more general than `map`. We've already seen one example -- where the number of elements that go in to `map` must always match the number of elements that come out of `map`, we were able to triple the number of elements coming out of `flatMap`. In fact, we can implement `map` using only `flatMap`.

## Implementing Map Using FlatMap

We want to implement the following:

```js
const map = (list, mapper) => {
  // ???
};
```

where `mapper` takes in a list item and can return anything. To implement `map` using `flatMap`, we need to make the `mapper` function of `map` compatible with the `mapper` function of `flatMap`. The simplest way to do this is to wrap the output of `map`'s `mapper` function in a list.

```js
const map = (list, mapper) => {
  const flatMapCompatibleMapper = (item) => [mapper(item)];
  return flatMap(list, flatMapCompatibleMapper);
};
```

or more concisely:

```js
const map = (list, mapper) => {
  return flatMap(list, (item) => [mapper(item)]);
};
```

And everything works as expected. Let's take a closer look at what happened.

TODO: insert diagram showing what happened

This implementation of `map` passes each element of the list through the initial `mapper` function, swaddles it in a list, and then concatenates the resulting lists together into the final result. It's admittedly less straightforward than the looped implementation of `map`, but functionally the two approaches are identical.


## We Ran Into A Slight Problem

"That's a very creative solution," your boss says. "But we've actually gone backwards a little. Our company strives to produce only evenly hatched squares. Not only have we started making oddly hatched squares, we've done so at three times the previous rate!"

## Implementing Filter Using FlatMap

We've seen `flatMap` increase the number of elements