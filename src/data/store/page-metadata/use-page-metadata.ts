import { useSelector } from 'react-redux'
import { ROUTE_PATHS } from 'constants-es'
import { useCheckScopeRoute } from 'hooks'
import { ReduxState } from 'libs/redux'

import { PageMetadata } from './interface'

const selector = (state: ReduxState) => state.pageMetadata

export const usePageMetadata = (pathname: string): PageMetadata => {
  const { isAdminRoute } = useCheckScopeRoute()
  const state = useSelector(selector)
  const pageMetadataDefault =
    state?.[isAdminRoute ? ROUTE_PATHS.ADMIN_HOME : ROUTE_PATHS.CLIENT_HOME]
  const pageMetadataByPathname = state?.[pathname]

  return pageMetadataByPathname || pageMetadataDefault
}
