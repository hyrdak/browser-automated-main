import { error } from 'console';

import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { useParams } from 'react-router-dom';
import { QUERY_KEYS } from 'constants-es';
import { useAppSelector } from 'libs/redux';

import { useQueryClient } from '@tanstack/react-query';
import { Button, message, Space } from 'antd';

import { useMutationUpdateWorkflow } from 'modules/work-flows/data/queries/use-mutation-update-workflow';
import { SettingNode } from 'components/common/react-flows/interface';

import ModalPreviewExportData from '../modal-preview-export-data';

interface Props {
    data: any;
    onSave:()=>void
}
// function findMaxKey(array: any, key: any) {
//     return array.reduce((max: number, obj: any) => (max > Number(obj[key]) ? max : Number(obj[key])), 1);
// }
export const Actions = ({ data ,onSave}: Props) => {
    const { getEdges, getNodes } = useReactFlow();
    const queryClient = useQueryClient();
    const mutationUpdate = useMutationUpdateWorkflow();
    const handleSave = () => {


        mutationUpdate.mutate(
            {
                ...data,
                script: {
                    nodes: getNodes(),
                    edges: getEdges()
                }
            },
            {
                onSuccess: (response: any) => {
                    if (response?.success) {
                        message.success('Update success');
                        onSave()
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.WORKFLOW_DETAIL, { select: '*', id: `eq.${Number(data.id)}` }]
                        });
                    } else {
                        message.error(response.message);
                    }
                }
            }
        );
    }

    return (
        <Space className="flex">
            <Button onClick={handleSave} type="primary" loading={mutationUpdate.isPending}>
                Save
            </Button>
            
            {/* <ModalPreviewExportData currentData={reactFlowSelected} /> */}
        </Space>
    );
}
