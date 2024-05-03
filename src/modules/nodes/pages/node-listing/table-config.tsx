import ReactJson from 'react-json-view';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

import ModalEditNode from './components/Edit-nodes-modal';


interface GetTableColumnsConfigProps {}
function handleEdit(record: any): void {
    console.log(record);
    
}

function handleDelete(id: any) {
    console.log(id);
    
}
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
            width: 200
        },
        {
            title: 'Type',
            key: 'name_type',
            dataIndex: 'name_type',
            width: 100
        },
        {
            title: 'Kind',
            key: 'name_kind',
            dataIndex: 'name_kind',
            width: 100,
            render: (kind: string) => <span className="capitalize">{kind}</span>
        },
        {
            title: 'JSON Options',
            key: 'name_jsonoptions',
            dataIndex: 'name_jsonoptions',
            render: (name_jsonoptions: any) => {
                return (
                    <ReactJson
                        // theme={'paraiso'}
                        name={false}
                        src={name_jsonoptions}
                        displayDataTypes={false}
                        collapsed
                        style={{
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}
                    />
                );
            }
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 101,
          render: (text: string, record: any) => (
            <span>
              <ModalEditNode id={record.id} />
              <Popconfirm
                title="Are you sure to delete this type?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />}></Button>
              </Popconfirm>
            </span>
          ),
        },
    ];

    return columnConfig;
};