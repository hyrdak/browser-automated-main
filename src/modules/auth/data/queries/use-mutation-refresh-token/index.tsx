import { useMutation } from '@tanstack/react-query'

import refreshToken from './fetch'

export function useMutationRefreshToken() {
  return useMutation({
    mutationFn: refreshToken,
  })
}
