import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function useCheckScopeRoute() {
  const {pathname} = useLocation()

  const isAdminRoute = useMemo(() => pathname.startsWith('/admin'), [pathname])

  return {
    isAdminRoute,
    isClientRoute: !isAdminRoute,
  }
}
