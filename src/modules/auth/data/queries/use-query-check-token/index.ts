import { QUERY_KEYS } from 'constants-es'

import { useQuery } from '@tanstack/react-query'

import requestCheckToken from './fetch'
import { CheckTokenParams } from './interfaces'

export function useQueryCheckToken(params:CheckTokenParams) {
  return useQuery({
    queryFn: ()=>requestCheckToken(params),
    queryKey:[QUERY_KEYS.CHECK_TOKEN_RECOVERY , params]
  })
}

export * from './interfaces'
