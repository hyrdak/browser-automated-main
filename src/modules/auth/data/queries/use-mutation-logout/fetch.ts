import { FetcherResponse } from "interfaces/fetcher"
import axiosInstance from "utils/fetcher"


const requestLogout = async (): Promise<FetcherResponse<null>> => {
  const { data: responseData } = await axiosInstance.post<
    FetcherResponse<null>
  >('/auth/v1/logout')

  return responseData
}

export default requestLogout
