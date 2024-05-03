import { useMutation } from '@tanstack/react-query'

import requestUpdatePassword from './fetch'

export function useMutationRequestUpdatePassword() {
  return useMutation({
    mutationFn: requestUpdatePassword,
  })
}

export * from './interfaces'
