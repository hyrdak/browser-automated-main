import { AxiosResponse } from 'axios'

import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { CreateWorkflowBody, CreateWorkflowResponseData } from './interfaces'

const createWorkflow = async (
  body: CreateWorkflowBody,
): Promise<FetcherResponse<CreateWorkflowResponseData>> => {
  const  {data: responseData} = await axiosInstance.post<FetcherResponse<CreateWorkflowResponseData>>('/rest/v1/flows', {
    ...body
  })


  return responseData
}

export default createWorkflow
