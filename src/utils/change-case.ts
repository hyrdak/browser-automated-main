import { cloneDeep } from "lodash"

export class ChangeCase {
  static readonly map = {
    fromObject: function <K = any, V = any>(value: any): Map<K, V> {
      return new Map<K, V>(Object.entries(value) as any)
    },
  }

  static readonly object = {
    fromMap: function <T = any>(value: Map<any, any>): T {
      const results = {} as any

      value.forEach((value: any, key: string) => {
        results[key] = value
      })

      return results as any
    },
    formatCase: function <T = any>(
      o: any,
      formatter: (str: string) => string,
      nested = true,
    ): T {
      const checks = {
        array: (value: any) => Array.isArray(value),
        object: (value: any) =>
          value === Object(value) &&
          !checks.array(value) &&
          typeof value !== 'function' &&
          !(value instanceof Date),
      }

      if (typeof formatter !== 'function') {
        throw Error('The formatter must be a function.')
      }

      if (checks.object(o)) {
        const n = {} as any

        Object.keys(o).forEach((k) => {
          if (nested) {
            n[formatter(k)] = ChangeCase.object.formatCase(o[k], formatter)
          } else {
            n[formatter(k)] = o[k]
          }
        })

        return n as any
      } else if (checks.array(o)) {
        return o.map((i: any) => ChangeCase.object.formatCase(i, formatter))
      }

      return o
    },
    toCamelCase: function <T = any>(o: T, nested = true): T {
      return ChangeCase.object.formatCase(
        o,
        ChangeCase.string.toCamelCase,
        nested,
      )
    },
    toSnakeCase: function <T = any>(o: T, nested = true): T {
      return ChangeCase.object.formatCase(
        o,
        ChangeCase.string.toSnakeCase,
        nested,
      )
    },
  }
  

  static readonly string = {
    toCamelCase: function (value: string) {
      const regex = /@{(.*)}/
      const _tempValue =  cloneDeep(value)
      const key = _tempValue.match(regex) || [];
      if(key?.length > 1){
        return value
      }
    
   return value.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    },
    toSnakeCase: function (value: string) {
      // Replace all non-word characters (except underscores)
      // with a single underscore
      value = value.replace(/[^\w\s]|_/g, '_')
      // Replace all consecutive spaces or underscores with a single underscore
      value = value.replace(/[\s_]+/g, '_')
      // Trim leading and trailing underscores
      value = value.replace(/^_|_$/g, '')
      // Convert camelCase to snake_case
      value = value.replace(/([a-z])([A-Z])/g, '$1_$2')
      // Convert the string to lowercase
      const snakeCase = value.toLowerCase()

      return snakeCase
    },
    camelize: function (value: string) {
      return ChangeCase.string.toCamelCase(value)
    },
  }
}

export default ChangeCase
export const getValueOfKey = (key: string) => {
    
  return key.match(/@{(.*)}/)?.[1] || key;
};