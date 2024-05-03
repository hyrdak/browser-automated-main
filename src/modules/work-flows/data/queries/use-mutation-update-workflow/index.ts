import { useMutation } from '@tanstack/react-query'

import updateWorkflow from './fetch'

export function useMutationUpdateWorkflow() {
  return useMutation({
    mutationFn: updateWorkflow,
  })
}

export * from './interfaces'
