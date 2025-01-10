# strong-array

[![npm version](https://badge.fury.io/js/strong-array.svg)](https://badge.fury.io/js/strong-array)

- [strong-array](#strong-array)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Number Example](#number-example)
    - [Symbol Example](#symbol-example)
    - [Mixed Example](#mixed-example)

---

## Overview

**strong-array** is a lightweight TypeScript utility designed to provide safe, strongly typed operations on arrays. Its current focus is on generating “enum-like” objects from read-only arrays using the `toEnum` function. This is useful for creating constant maps for configuration keys, symbolic references, or any scenario where you want to ensure type safety and immutability in your arrays and corresponding objects.

## Features

- **Compile-time type safety** for enum-like mappings derived from read-only arrays.
- Works with all valid object key types (`string`, `number`, and `symbol`).
- Encourages immutable, predictable structures by requiring `as const` arrays.

## Installation

Use either npm, yarn, pnpm, or bun to install:

```bash
npm install strong-array
```

or

```bash
yarn add strong-array
```

or

```bash
pnpm add strong-array
```

or

```bash
bun add strong-array
```

---

## Quick Start

1. **Import** the utility into your TypeScript project.
2. **Convert** a read-only (i.e., `as const`) array of keys to an object.
3. **Use** the resulting enum-like dictionary for safely accessing these keys.

```typescript
import { toEnum } from 'strong-array';

const statuses = ['OPEN', 'CLOSED', 'PENDING'] as const;
const STATUS_ENUM = toEnum(statuses);

console.log(STATUS_ENUM.OPEN); // "OPEN"
console.log(STATUS_ENUM.CLOSED); // "CLOSED"
console.log(STATUS_ENUM.PENDING); // "PENDING"
```

That’s it! You now have a compile-time safe mapping of your array’s items.

---

## Usage

The main export, `toEnum`, transforms a read-only array into a plain object whose keys (and values) are the elements of that array. This ensures:

1. You always have an exact mapping of your array’s elements.
2. TypeScript will properly infer the keys in the resulting object based on the elements of the array.
3. It supports `string`, `number`, and `symbol` types, preserving type information.

### Basic Example

```typescript
import { toEnum } from 'strong-array';

const stringArray = ['APP_ENV', 'NODE_ENV'] as const;
const stringEnum = toEnum(stringArray);

/*
  Resulting type:
  {
    readonly APP_ENV: "APP_ENV";
    readonly NODE_ENV: "NODE_ENV";
  }
*/

console.log(stringEnum.APP_ENV); // "APP_ENV"
```

### Number Example

```typescript
import { toEnum } from 'strong-array';

const numberArray = [0, 1, 200, -1] as const;
const numberEnum = toEnum(numberArray);

/*
  Resulting type:
  {
    readonly 0: 0;
    readonly 1: 1;
    readonly 200: 200;
    readonly -1: -1;
  }
*/

console.log(numberEnum[0]); // 0
```

### Symbol Example

```typescript
import { toEnum } from 'strong-array';

const A = Symbol('a');
const B = Symbol('b');
const C = Symbol('c');
const symbolArray = [A, B, C] as const;
const symbolEnum = toEnum(symbolArray);

/*
  Resulting type:
  {
    readonly [A]: typeof A;
    readonly [B]: typeof B;
    readonly [C]: typeof C;
  }
*/

console.log(symbolEnum[A]); // Symbol(a)
```

### Mixed Example

```typescript
import { toEnum } from 'strong-array';

const A = Symbol('a');
const mixedArray = ['APP_ENV', 100, A] as const;
const mixedEnum = toEnum(mixedArray);

/*
  Resulting type:
  {
    readonly APP_ENV: "APP_ENV";
    readonly 100: 100;
    readonly [A]: A;
  }
*/
```

### Why Use `as const`?

TypeScript’s `as const` assertion tells the compiler to infer the most specific (literal) types for each element in your array. Without it, the resulting object would lose specificity (e.g., every string would be typed simply as `string` instead of a literal `'APP_ENV'`).

---

## Type Safety

By combining read-only array assertions (`as const`) with TypeScript’s mapped types, `strong-array` ensures that your resulting enum-like objects are always accurate reflections of the array’s contents. This guards against typos, unexpected keys, and other common errors, all at compile time.

---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are always welcome! Feel free to open an issue or submit a pull request on GitHub if you have feature requests or bug fixes.
