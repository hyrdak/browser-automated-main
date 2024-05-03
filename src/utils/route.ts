
import { Params } from 'react-router-dom'

import { isArray } from 'lodash'

import { stringTemplate } from './format'

function normalizeParams(params: Params): Params {
  return Object.entries(params).reduce((acc:any, [key, value]) => {
    if (isArray(value)) {
      acc[key] = value.join('/')
    } else {
      acc[key] = value
    }

    return acc
  }, {} as Params)
}

export function matchPath(
  pattern: string,
  pathname: string,
  params: Params = {},
): boolean {
  const paramsNormalized:any = normalizeParams(params)
  const pathnameByPattern = stringTemplate(pattern, paramsNormalized, 'colon')

  return pathname === pathnameByPattern
}
