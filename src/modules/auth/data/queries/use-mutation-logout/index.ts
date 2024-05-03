import { useMutation } from '@tanstack/react-query'

import requestLogout from './fetch'

export function useMutationLogout() {
  return useMutation({
    mutationFn: requestLogout,
  })
}
