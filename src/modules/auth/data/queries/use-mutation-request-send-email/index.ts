import { useMutation } from '@tanstack/react-query'

import requestSendEmail from './fetch'

export function useMutationRequestSendEmail() {
  return useMutation({
    mutationFn: requestSendEmail,
  })
}

export * from './interfaces'
