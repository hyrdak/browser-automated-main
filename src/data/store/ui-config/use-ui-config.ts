import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'libs/redux'

import { SetUIConfigPayload, UIConfigState } from './interface'
import { setUIConfig } from './slice'

interface UseUIConfig extends UIConfigState {
  setUIConfig: (payload: SetUIConfigPayload) => void
}

export const useUIConfig = (): UseUIConfig => {
  const uiConfig = useAppSelector((state) => state.uiConfig)
  const dispatch = useAppDispatch()

  const handleSetUIConfig = useCallback(
    (payload: SetUIConfigPayload) => {
      dispatch(setUIConfig(payload))
    },
    [dispatch],
  )

  return {
    ...uiConfig,
    setUIConfig: handleSetUIConfig,
  }
}
