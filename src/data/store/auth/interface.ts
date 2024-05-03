import { User } from "interfaces/user"

export interface AuthState {
  isAuthenticated: boolean
  isFetched: boolean
  user?: User
}

export interface SetAuthUserPayload {
  user?: User
  accessToken?: string
  refreshToken?: string
}
