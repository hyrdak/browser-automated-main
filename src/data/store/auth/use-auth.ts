
import { useAppSelector } from 'libs/redux'

import { AuthState } from './interface'

interface UseAuth extends AuthState {}

export const useAuth = (): UseAuth => {
  const auth = useAppSelector((state) => state.auth)

  return auth
}
