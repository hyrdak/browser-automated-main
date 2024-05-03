import { useEffect, useMemo, useState } from 'react';
import databaseService from 'databaseService';

import { Table } from 'antd';
import { flatten } from 'lodash';

import { dataCommandModal } from 'components/common/react-flows/components/nodes/data';
import { getListCommandNode } from 'components/common/react-flows/constants';
import { COMMAND_NODE_LABELS, CommandNode, KindNode } from 'components/common/react-flows/constants/enum';
import { PageHeaderProvider } from 'components/core/page-header-provider';

import ModalCreateNode from './components/Create-nodes-modal';
import { getTableColumnsConfig } from './table-config';

const NodeListingRoot = () => {
    const [listDnd, setListDnd] = useState<any>([]);
    const [data, setData] = useState<Array<any>>([]);

    const handleGetData = async () => {
        setData(await databaseService.getNodesList());
        const listLocalStore = localStorage.getItem('listReactFlowInstance');
        try {
            if (listLocalStore && Array.isArray(JSON.parse(listLocalStore))) {
                setListDnd(JSON.parse(listLocalStore));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreated = (data: any) => {
        const newListDnd = [...listDnd, data];
        setListDnd(newListDnd);
        localStorage.setItem('listReactFlowInstance', JSON.stringify(newListDnd));
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const handleRemove = (item: any) => {
        const newListDnd = listDnd.filter((i: any) => i.id !== item.id);
        setListDnd(newListDnd);
        localStorage.setItem('listReactFlowInstance', JSON.stringify(newListDnd));
    };
    
    

    // const DataNode = useMemo(async () => {
    //     const inputNode = [
    //         {
    //             id: CommandNode.Start,
    //             kind: 'initial',
    //             action: CommandNode.Start,
    //             dataOptions: dataCommandModal[CommandNode.Start],
    //             type: 'input',
    //             name: COMMAND_NODE_LABELS[CommandNode.Start]
    //         },
    //         {
    //             id: CommandNode.Stop,
    //             kind: 'Other',
    //             action: CommandNode.Stop,
    //             dataOptions: dataCommandModal[CommandNode.Start],
    //             type: 'Other',
    //             name: COMMAND_NODE_LABELS[CommandNode.Stop]
    //         }
    //     ];

    //     const customNode = Object.entries(KindNode).reduce((dataSource: any[], [key, value]: any) => {
    //         const itemList = getListCommandNode(value).map((item: CommandNode) => ({
    //             id: item,
    //             kind: value,
    //             type: 'custom',
    //             dataOptions: dataCommandModal[item],
    //             name: COMMAND_NODE_LABELS[item]
    //         }));

    //         return flatten([dataSource, itemList]);
    //     }, []);
            
            
    //     return data;
    // }, []);

    const columns = getTableColumnsConfig({});
    // console.log(data);
    
    return (
        <div style={{}}>
            {/* <PageHeaderProvider extra={<ModalCreateReactFlow listDnd={listDnd} onCreated={handleCreated} />} /> */}
            <PageHeaderProvider extra={<ModalCreateNode />} />
            <div className="mb-3">
                <span className='mb-3'>
                    <ModalCreateNode />
                </span>
                <span className='mb-3 ml-2'>
                    <ModalCreateNode />
                </span>
            </div>
            <Table dataSource={data} columns={columns} bordered />
        </div>
    );
};

export default NodeListingRoot;
