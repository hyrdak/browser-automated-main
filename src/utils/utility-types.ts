type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

type CamelToSnakeCaseConvertPropertyNames<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K]
}

export type CamelToSnake<T> = T extends Array<infer U>
  ? CamelToSnake<U>[]
  : T extends object
  ? CamelToSnakeCaseConvertPropertyNames<T>
  : T

type SnakeToCamelCase<S extends string> = S extends `${infer R}_${infer U}`
  ? `${R}${Capitalize<SnakeToCamelCase<U>>}`
  : S

type SnakeToCamelCaseConvertPropertyNames<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K]
}

export type SnakeToCamel<T> = T extends Date
  ? T // Ignore converting Date objects
  : T extends object
  ? SnakeToCamelCaseConvertPropertyNames<T>
  : T
