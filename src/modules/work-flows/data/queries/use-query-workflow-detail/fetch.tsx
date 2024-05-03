import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';

import { WorkflowDetailRequest, WorkflowDetailResponse } from './interfaces';

const getWorkflowDetail = async (params: WorkflowDetailRequest): Promise<FetcherResponse<WorkflowDetailResponse[]>> => {
    const { data: responseData } = await axiosInstance.get<FetcherResponse<WorkflowDetailResponse[]>>(
        '/rest/v1/flows',
        {
            params: {
                ...params,
                limit: 1
            }
        }
    );

    return responseData;
};

export default getWorkflowDetail;
