/**
 * Converts a read-only array of `string`, `number`, or `symbol` elements
 * into an enum-like dictionary object. Each array element becomes both
 * the key and value in the resulting object.
 *
 * @remarks
 * - The input array should use `as const` to ensure proper literal
 *   type inference.
 * - This function creates and mutates a temporary accumulator object
 *   during the loop, but returns the fully built result.
 * - It supports `string`, `number`, and `symbol` property keys.
 *
 * @typeParam T - A read-only array containing elements of type `PropertyKey`.
 *
 * @param values - A read-only array of unique property keys.
 * @returns An object where each key is one element of the array,
 *          and each value is the same element (ensuring a one-to-one mapping).
 *
 * @example
 * ```ts
 * // Strings
 * const stringArr = ["APP_ENV", "NODE_ENV"] as const;
 * const stringEnum = toEnum(stringArr);
 * // => { readonly APP_ENV: "APP_ENV", readonly NODE_ENV: "NODE_ENV" }
 * ```
 *
 * @example
 * ```ts
 * // Numbers
 * const numberArr = [0, 1, 200, -1] as const;
 * const numberEnum = toEnum(numberArr);
 * // => { readonly 0: 0, readonly 1: 1, readonly 200: 200, readonly -1: -1 }
 * ```
 *
 * @example
 * ```ts
 * // Symbols
 * const A = Symbol("a");
 * const B = Symbol("b");
 * const C = Symbol("c");
 * const symbolArray = [A, B, C] as const;
 * const symbolEnum = toEnum(symbolArray);
 * // => { readonly [A]: typeof A, readonly [B]: typeof B, readonly [C]: typeof C }
 * ```
 *
 */
export function toEnum<const T extends ReadonlyArray<PropertyKey>>(values: T) {
  const init = {} as { readonly [K in T[number]]: K }

  const len = values.length
  let i = 0
  while (i < len) {
    // @ts-expect-error
    // We mutate the accumulator object for performance reasons.
    init[values[i]] = values[i]
    i++
  }

  return init
}
