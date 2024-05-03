import { useEffect, useState } from 'react';
import { ROUTE_PATHS } from 'constants-es';

import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'antd';

import { useUIConfig } from 'data/store/ui-config/use-ui-config';
import { useMutationCreateWorkflow } from 'modules/work-flows/data/queries';
import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';
import { useQueryGetWorkflows } from 'modules/work-flows/data/queries/use-query-workflows';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import { ModalCreateReactFlow } from './components/modal-create-react-flow';
import { getTableColumnsConfig } from './table-config';

import 'reactflow/dist/style.css';

const WorkflowListingRoot = () => {
    const { data, isFetching } = useQueryGetWorkflows();
    const { isSmallScreen } = useUIConfig();


    const handleGetData = () => {
        const listLocalStore = localStorage.getItem('listReactFlowInstance');
        try {
            if (listLocalStore && Array.isArray(JSON.parse(listLocalStore))) {
                // setListDnd(JSON.parse(listLocalStore));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const columns = getTableColumnsConfig({
        isSmallScreen
    });


    return (
        <div style={{}}>
            <PageHeaderProvider extra={<ModalCreateReactFlow />} />
            <Table loading={isFetching} dataSource={data?.data || []} columns={columns}></Table>
        </div>
    );
};

export default WorkflowListingRoot;
