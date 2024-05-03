import { QUERY_KEYS } from 'constants-es';

import { useQuery } from '@tanstack/react-query';

import getWorkflowDetail from './fetch';
import { WorkflowDetailRequest } from './interfaces';

export function useQueryGetWorkflowDetail(params: WorkflowDetailRequest) {
    return useQuery({
        queryKey: [QUERY_KEYS.WORKFLOW_DETAIL, params],
        queryFn: () => getWorkflowDetail(params),
        select(response) {
            return {
                ...response,
                data: response.data?.length > 0 ? response?.data[0] : ({} as any)
            };
        }
    });
}

export * from './interfaces';
