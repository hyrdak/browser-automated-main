export interface UIConfigState {
  isSidebarCollapsed: boolean
  isSmallScreen: boolean
}

export interface SetUIConfigPayload {
  key: keyof UIConfigState
  value: UIConfigState[keyof UIConfigState]
}
