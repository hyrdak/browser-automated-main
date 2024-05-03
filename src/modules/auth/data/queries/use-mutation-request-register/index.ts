import { useMutation } from '@tanstack/react-query'

import requestRegister from './fetch'

export function useMutationRequestRegister() {
  return useMutation({
    mutationFn: requestRegister,
  })
}

export * from './interfaces'
