import { authSlice,pageMetadataSlice, reactFlowSlice,uiConfigSlice  } from 'data/store'


export const reducer = {
  [uiConfigSlice.name]: uiConfigSlice.reducer,
  [pageMetadataSlice.name]: pageMetadataSlice.reducer,
  [reactFlowSlice.name]: reactFlowSlice.reducer,
  [authSlice.name]: authSlice.reducer,
}
