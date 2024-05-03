import { useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { matchPath } from 'utils'


interface UseCheckPathMatched {
  checkPathMatched: (path: string) => boolean
}

export function useCheckPathMatched(): UseCheckPathMatched {
  const {pathname} = useLocation()
  const params = useParams()

  const checkPathMatched = useCallback(
    (path: string): boolean => {
      const isMatched = matchPath(path, pathname, params)

      return isMatched
    },
    [params, pathname],
  )

  return {
    checkPathMatched,
  }
}
