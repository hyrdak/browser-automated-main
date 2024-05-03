import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SetUIConfigPayload, UIConfigState } from './interface'

const initialState: UIConfigState = {
  isSidebarCollapsed: true,
  isSmallScreen: false,
}

export const uiConfigSlice = createSlice({
  name: 'uiConfig',
  initialState,
  reducers: {
    setUIConfig: (state, action: PayloadAction<SetUIConfigPayload>) => {
      state[action.payload.key] = action.payload.value
    },
  },
})

export const { setUIConfig } = uiConfigSlice.actions
