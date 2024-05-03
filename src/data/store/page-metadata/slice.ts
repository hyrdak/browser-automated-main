import { ROUTE_PATHS } from 'constants-es'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEqual } from 'lodash'

import {
  AddPageMetadata,
  PageMetadataState,
  SetPageMetadata,
} from './interface'

const initialState: PageMetadataState = {
  [ROUTE_PATHS.ADMIN_HOME]: {
    title: 'Dashboard',
    isShowBreadcrumb: false,
  },
  [ROUTE_PATHS.CLIENT_HOME]: {
    title: 'Dashboard',
    isShowBreadcrumb: false,
  },
}

export const pageMetadataSlice = createSlice({
  name: 'pageMetadata',
  initialState,
  reducers: {
    setPageMetadata: (
      state: PageMetadataState,
      action: PayloadAction<SetPageMetadata>,
    ) => {
      const { data, pathname } = action.payload
      const dataByPathname = state[pathname]

      if (!dataByPathname || !isEqual(dataByPathname, data)) {
        state[pathname] = data
      }
    },
    addPageMetadata: (
      state: PageMetadataState,
      action: PayloadAction<AddPageMetadata>,
    ) => {
      const { data, pathname } = action.payload
      const dataByPathname = state[pathname]
      state[pathname] = {
        ...dataByPathname,
        ...data,
      }
    },
  },
})

export const { setPageMetadata, addPageMetadata } = pageMetadataSlice.actions
