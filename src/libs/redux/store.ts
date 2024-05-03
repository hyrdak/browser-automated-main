import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'

import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit'

import { middleware } from './middleware'
import { reducer } from './reducer'

export const reduxStore = configureStore({
  reducer,
  
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(middleware)
  // },
})

export const useAppDispatch = () => useDispatch<ReduxDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>
