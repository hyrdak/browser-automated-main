import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { RequestLoginResponseData } from '../use-mutation-request-login'
import { RequestSendEmailBody, RequestSendEmailResponseData } from './interfaces'

const requestSendEmail = async (
  body: RequestSendEmailBody,
): Promise<FetcherResponse<RequestSendEmailResponseData>> => {
  const { data: responseData } = await axiosInstance.post<
    FetcherResponse<RequestLoginResponseData>
  >('/auth/v1/recover', body)
  
  return responseData
}

export default requestSendEmail
