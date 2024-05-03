import React from 'react';
import ReactJson from 'react-json-view';
import { Elements } from 'components';

import { ElementType } from 'components/ui/elements/constants/enum';

interface GetTableColumnsConfigProps {}

export const getTableColumnsConfig = (props: GetTableColumnsConfigProps) => {
    const columnConfig: any[] = [
        {
            title: '#',
            key: 'id',
            dataIndex: 'id',
            width: 50,
            align: 'center',
            render: (_id: string, _record: any, index: number) => <span className="capitalize">{index + 1}</span>
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: 100,
            align: 'center'
        },
        {
            title: '',
            key: 'type',
            dataIndex: 'type',
            align: 'left',
            width: 50,
            render: (type: any) => {
                const Component: any = Elements[type as ElementType];

                return (
                    <div>
                        <Component style={{ width: '100%' }} />
                    </div>
                );
            }
        }
    ];

    return columnConfig;
};
