import { AxiosResponse } from 'axios'

import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { RequestRegisterBody, RequestRegisterResponseData } from './interfaces'

const requestRegister = async (
  body: RequestRegisterBody,
): Promise<FetcherResponse<RequestRegisterResponseData>> => {
  const  {data: responseData} = await axiosInstance.post<FetcherResponse<RequestRegisterResponseData>>('/auth/v1/signup', body)


  return responseData
}

export default requestRegister
