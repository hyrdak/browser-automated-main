import React, { useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
import { useReactFlow } from 'reactflow';

import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

type Props = {
    currentData: any;
};

const ExportData = ({ currentData }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const { getEdges, getNodes } = useReactFlow();

    const dataDisplay = currentData;

    const handleExport = () => {
        setLoading(true);
        try {
            setTimeout(() => {
                const data: any = JSON.stringify(dataDisplay, null, 2); // Replace with your actual data
                const blob = new Blob([data], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = dataDisplay?.name + '.txt';
                link.click();
                URL.revokeObjectURL(url);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                icon={<DownloadOutlined />}
                onClick={() => setOpen(true)}
                type="default"
                className="bg-green-500 border border-gray-300 hover:!bg-green-400 text-white hover:!text-white"
            ></Button>
            <Modal
                confirmLoading={loading}
                open={open}
                title={'Export data'}
                onCancel={() => setOpen(false)}
                onOk={handleExport}
                width={800}
                okText="Export"
                style={{
                    top: 20
                }}
            >
                <div className="">
                    <ReactJson
                        theme={'monokai'}
                        src={dataDisplay}
                        displayDataTypes={false}
                        style={{
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ExportData;
