import { LocalStoreKey } from 'constants-es/local-store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAuth, setAuth } from 'helpers/auth';
import { setLocalStore } from 'helpers/local-store';

import { AuthState, SetAuthUserPayload } from './interface'

const initialState: AuthState = {
  isAuthenticated: getAuth() ? true : false,
  isFetched: false,
  user: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state:AuthState, action: PayloadAction<SetAuthUserPayload>) => {
      state.isAuthenticated = !!action.payload.user
      state.user = action.payload.user
      state.isFetched = true;
      if(action.payload.accessToken){
        setAuth(action.payload.accessToken)
      }
      if(action.payload.refreshToken){
        setLocalStore(LocalStoreKey.RefreshTokenLocalStoreKey, action.payload.refreshToken)
      }
    },
    resetAuth: (state:AuthState) => {
      state.isAuthenticated = false
      state.user = undefined
      state.isFetched = false
    },
  },
})

export const { setAuthUser, resetAuth } = authSlice.actions
