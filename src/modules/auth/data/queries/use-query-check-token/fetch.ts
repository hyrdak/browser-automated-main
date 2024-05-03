import { FetcherResponse } from 'interfaces/fetcher'

import { CheckTokenData, CheckTokenParams } from './interfaces'

const requestCheckToken = async (
  params: CheckTokenParams,
): Promise<FetcherResponse<CheckTokenData>> => {
  // const { data: responseData } = await axiosInstance.post<
  //   FetcherResponse<RequestLoginResponseData>
  // >('/api/client/auth/login', body)
  const responseData =  await new Promise<FetcherResponse<CheckTokenData>>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        status: 200,
        message: 'Success',
        error: null,
        data: {
          isValid:true
        }
      })
    }, 1000)})

  return responseData
}

export default requestCheckToken
