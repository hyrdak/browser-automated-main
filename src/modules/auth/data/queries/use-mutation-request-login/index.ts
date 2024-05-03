import { useMutation } from '@tanstack/react-query'

import requestLogin from './fetch'

export function useMutationRequestLogin() {
  return useMutation({
    mutationFn: requestLogin,
  })
}

export * from './interfaces'
