---
order: 20
category:
  - 笔记
  - frontend
tag:
  - ts
  - typescript
---

# Narrowing

Imagine we have a function called `padLeft`.

```ts:no-v-pre twoslash
function padLeft(padding: number | string, input: string): string {
  throw new Error('Not implemented yet!')
}
```

If `padding` is a `number`, it will treat that as the number of spaces we want to prepend to `input`.
If `padding` is a `string`, it should just prepend `padding` to `input`.

Let's try to implement the logic for when `padLeft` is passed a `number` for `padding`.

```ts:no-v-pre twoslash
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input
    //                ^?
  }

  return padding + input
  //     ^?
}
```

## `typeof` type guards

JavaScript supports a `typeof` operator which can give very basic information about the type of values we have at runtime.
TypeScript expects this to return a certain set of strings:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

In TypeScript, checking against the value returned by `typeof` is a _type guard_.

`typeof` doesn't return the string `null`, <mark>`typeof null` is actually `"object"`!</mark>

```ts:no-v-pre twoslash
// @errors: 18047
function printAll(strs: string | string[] | null) {
  if (typeof strs === 'object') {
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    console.log(strs)
  } else {
    // do nothing
  }
}
```

In the `printAll` function, we try to check if `strs` is an object to see if it's an array type, But it turns out that in JavaScript, `typeof null` is actually `"object"`!

## Truthiness narrowing

Values like

- `0`
- `NaN`
- `''` (the empty string)
- `0n` (the `bigint` version of zero)
- `null`
- `undefined`

all coerce to `false`, and other values get coerced to `true`.

You can always coerce values to `boolean`s by running them through the `Boolean` function, or by using the shorter <mark>double-Boolean negation</mark>.

It's fairly popular to leverage this behavior, <mark>especially for guarding against values like `null` or `undefined`</mark>.

```ts:no-v-pre twoslash
// both of these result in 'true'
Boolean('hello')
!!'world'
```

### Equality narrowing

TypeScript also uses `switch` statements and equality checks like `===`, `!==`, `==`, and `!=` to narrow types.
For example:

```ts:no-v-pre twoslash
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    console.log(x.toUpperCase())
    //          ^?

    console.log(y.toUpperCase())
    //          ^?
  } else {
    console.log(x)
    //          ^?

    console.log(y)
    //          ^?
  }
}
```

Since `string` is the only common type that both `x` and `y` could take on, TypeScript knows that `x` and `y` must be `string`s in the first branch.

JavaScript's looser equality checks with `==` and `!=` also get narrowed correctly.

If you're unfamiliar, checking whether something `== null` actually not only checks whether it is specifically the value `null` - it also checks whether it's potentially `undefined`.
The same applies to `== undefined`: it checks whether a value is either `null` or `undefined`.

```ts:no-v-pre twoslash
interface Container {
  value: number | null | undefined
}

function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value)
    //                    ^?

    // Now we can safely multiply 'container.value'.
    container.value *= factor
  }
}
```
