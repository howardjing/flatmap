# A Whirlwind Tour of Map, Filter, and FlatMap

One thing I hated when learning to program was loops. Loops are repetitive. Not just running them, writing them too. Most of the time all you're really doing is iterating through elements of a list, performing some transformation on them, and then shoving the result into another list. You can only do this so many times before you lose your mind. Luckily, there is a better way.

## List World

TODO: insert diagram

In the above diagram we see an oval. Inside the oval are triangles filled with various hatch marks. The first triangle is filled with vertical hatch marks. The second triangle is filled with horizontal hatch marks. Let's consider the oval a list, and each triangle an element of that list. Let's consider the topmost triangle the first element of the list, and the bottommost triangle the last element of the list. Unbeknownst to us, this list has super powers. They are `map`, `filter`, and `flatMap`.

## Map

Suppose our boss assigns us the following task: "I want you to take this list of triangles, and I want you to turn it into a list of squares. Make sure you preserve the direction of the hatch marks!" After some hard work, we come up with a triangle transmogrifier. Let's see it in action.

TODO: insert diagram

Success! We've transmogrified the triangle into a square, all while preserving hatch marks. How can we complete our task? This is one approach:

```js
const squares = [];
triangles.forEach((triangle) => {
  const square = transmogrify(triangle);
  squares.push(circle);
});
```

Once it finishes running, we'll have a list of squares.
