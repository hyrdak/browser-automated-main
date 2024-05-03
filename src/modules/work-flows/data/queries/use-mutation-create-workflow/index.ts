import { useMutation } from '@tanstack/react-query'

import createWorkflow from './fetch'

export function useMutationCreateWorkflow() {
  return useMutation({
    mutationFn: createWorkflow,
  })
}

export * from './interfaces'
