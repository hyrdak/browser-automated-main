import { useMutation } from '@tanstack/react-query'

import deleteWorkflow from './fetch'

export function useMutationDeleteWorkflow() {
  return useMutation({
    mutationFn: deleteWorkflow,
  })
}

