import { QUERY_KEYS } from 'constants-es'

import { useQuery } from '@tanstack/react-query'

import getUserProfile from './fetch'

export function useQueryUserProfile(enabled: boolean = true) {

return useQuery(
   {
      queryKey: [QUERY_KEYS.USER_PROFILE],
      queryFn: getUserProfile,
   }
  )
}

export * from './interfaces'
