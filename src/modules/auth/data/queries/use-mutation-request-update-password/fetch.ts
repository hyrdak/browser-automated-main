import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { RequestLoginResponseData } from '../use-mutation-request-login'
import { RequestUpdatePasswordBody , RequestUpdatePasswordData } from './interfaces'

const requestUpdatePassword = async (
  {token, ...body }: RequestUpdatePasswordBody,
): Promise<FetcherResponse<RequestUpdatePasswordData>> => {
  const { data: responseData } = await axiosInstance.put<
    FetcherResponse<RequestLoginResponseData>
  >('/auth/v1/user', body , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
  })
  
  return responseData
}

export default requestUpdatePassword
