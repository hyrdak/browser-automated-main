import { QUERY_KEYS } from 'constants-es';

import { useQuery } from '@tanstack/react-query';

import getWorkflows from './fetch';

export function useQueryGetWorkflows(enabled: boolean = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.WORKFLOWS],
        queryFn: getWorkflows,
    });
}

export * from './interfaces';
