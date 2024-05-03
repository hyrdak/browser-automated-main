import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';

import { WorkflowResponse } from './interfaces';

const getWorkflows = async (): Promise<FetcherResponse<WorkflowResponse[]>> => {
    const { data: responseData } = await axiosInstance.get<FetcherResponse<WorkflowResponse[]>>('/rest/v1/flows');

    return responseData;
};

export default getWorkflows;
