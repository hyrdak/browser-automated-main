import { FetcherResponse } from "interfaces/fetcher"
import axiosInstance from "utils/fetcher"


const refreshToken = async (refreshToken:string): Promise<FetcherResponse<null>> => {
  const { data: responseData } = await axiosInstance.post<
    FetcherResponse<null>
  >('/auth/v1/token?grant_type=refresh_token', {
    refreshToken
  })

  return responseData
}

export default refreshToken
