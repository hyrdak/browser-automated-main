export interface FetcherResponse<D = null> {
  success: boolean
  status: number
  message: string | string[]
  error: any
  data: D
}
