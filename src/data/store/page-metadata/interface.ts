export interface PageMetadata {
  title: string
  description?: string
  headerTitle?: string
  headerSubTitle?: string
  shouldShowGoBack?: boolean
  hasHeaderDescription?: boolean
  hasExtra?: boolean
  hasTag?: boolean
  hasFooter?: boolean
  isShowBreadcrumb?: boolean
}

export interface PageMetadataState {
  [key: string]: PageMetadata
}

export interface SetPageMetadata {
  data: PageMetadata
  pathname: string
}

export interface AddPageMetadata {
  data: Partial<PageMetadata>
  pathname: string
}
