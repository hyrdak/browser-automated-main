import { AxiosResponse } from 'axios'

import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { RequestLoginBody, RequestLoginResponseData } from './interfaces'

const requestLogin = async (
  body: RequestLoginBody,
): Promise<FetcherResponse<RequestLoginResponseData>> => {
  const {data:responseData} = await axiosInstance.post<FetcherResponse<RequestLoginResponseData>>('/auth/v1/token?grant_type=password', body)
  // const responseData =  await new Promise<FetcherResponse<RequestLoginResponseData>>((resolve, reject) => {
  //   setTimeout(() => {
  //     if(body.email === 'root@canawan.com' && body.password === 'IT@2024') {
  //       resolve({
  //         success: true,
  //         statusCode: 200,
  //         message: 'Success',
  //         error: null,
  //         data: {
  //           accessToken: 'accessToken',
  //           user:{
  //             id: 1,
  //             email: 'root@canawan.com',
  //             name:"admin",
  //           }
  //         }
  //       })
  //     }else{
  //       reject({
  //         success: false,
  //         statusCode: 401,
  //         message: 'Invalid email or password. Please try again.',
  //         error: null,
  //         data: null
  //       })
  //     }
  //   }, 1000)})

  return responseData
}

export default requestLogin
