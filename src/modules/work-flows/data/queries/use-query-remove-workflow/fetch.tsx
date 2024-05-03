import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';


const deleteWorkflow = async (id: any): Promise<FetcherResponse<any>> => {
    const { data: responseData } = await axiosInstance.delete<FetcherResponse<any>>(
        '/rest/v1/flows?id=eq.' + id,
       
    );

    return responseData;
};

export default deleteWorkflow;
