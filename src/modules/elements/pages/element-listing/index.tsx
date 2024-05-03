import { useEffect, useMemo, useState } from 'react';
import { Elements } from 'components';

import { Table } from 'antd';
import { flatten } from 'lodash';

import { dataCommandModal } from 'components/common/react-flows/components/nodes/data';
import { getListCommandNode } from 'components/common/react-flows/constants';
import { COMMAND_NODE_LABELS, CommandNode, KindNode } from 'components/common/react-flows/constants/enum';
import { ElementType } from 'components/ui/elements/constants/enum';

import { getTableColumnsConfig } from './table-config';

const ElementListingRoot = () => {
    const [list, setList] = useState<any>([]);

 const dataSources =  useMemo(() => {
    const temp:any = []
    
    return Object.entries(Elements).map(([key, value]: any) => {
        return  {
            name: key,
            type: ElementType[key as ElementType],
        }
    })
    
   }, [])
    
    const DataNode = useMemo(() => {
        const inputNode = [
            {
                id: CommandNode.Start,
                kind: 'initial',
                action: CommandNode.Start,
                dataOptions: dataCommandModal[CommandNode.Start],
                type: 'input',
                name: COMMAND_NODE_LABELS[CommandNode.Start]
            },
            {
                id: CommandNode.Stop,
                kind: 'Other',
                action: CommandNode.Stop,
                dataOptions: dataCommandModal[CommandNode.Start],
                type: 'Other',
                name: COMMAND_NODE_LABELS[CommandNode.Stop]
            }
        ];

        const customNode = Object.entries(KindNode).reduce((dataSource: any[], [key, value]: any) => {
            const itemList = getListCommandNode(value).map((item: CommandNode) => ({
                id: item,
                kind: value,
                type: 'custom',
                dataOptions: dataCommandModal[item],
                name: COMMAND_NODE_LABELS[item]
            }));

            return flatten([dataSource, itemList]);
        }, []);

        return flatten([inputNode, customNode]);
    }, []);

    const columns = getTableColumnsConfig({});

    return (
        <div style={{}}>
            {/* <PageHeaderProvider extra={<ModalCreateReactFlow listDnd={listDnd} onCreated={handleCreated} />} /> */}
            <Table dataSource={dataSources} columns={columns} bordered />
        </div>
    );
};

export default ElementListingRoot;
