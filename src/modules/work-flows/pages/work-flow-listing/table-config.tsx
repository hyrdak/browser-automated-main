import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';

import { EditOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BsThreeDots } from 'react-icons/bs';

import ButtonDelete from './components/button-delete';
import ExportData from './components/modal-preview-export-data';

interface GetTableColumnsConfigProps {
    isSmallScreen: boolean;
}

export const getTableColumnsConfig = ({ isSmallScreen }: GetTableColumnsConfigProps) => {
    const columnConfig: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Nodes',
            dataIndex: ['script', 'nodes'],
            key: 'description',
            render: (nodes: any) => {
                return nodes?.length;
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 100,

            render: (_: any, record: any) => {
                return isSmallScreen ? (
                    <Popover
                        content={
                            <div className="flex gap-2">
                                <Link to={ROUTE_PATHS.WORK_FLOWS + '/' + record.id}>
                                    <Button icon={<EditOutlined />} type="primary"></Button>
                                </Link>
                                <ExportData currentData={record} />
                                <ButtonDelete data={record} />
                            </div>
                        }
                        placement="bottom"
                        trigger="click"
                    >
                        <Button
                            type="default"
                            icon={
                                <BsThreeDots
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                />
                            }
                        ></Button>
                    </Popover>
                ) : (
                    <div className="flex gap-2">
                        <Link to={ROUTE_PATHS.WORK_FLOWS + '/' + record.id}>
                            <Button icon={<EditOutlined />} type="primary"></Button>
                        </Link>
                        <ExportData currentData={record} />
                        <ButtonDelete data={record} />
                    </div>
                );
            }
        }
    ];

    return columnConfig;
};
