import React, { useMemo, useState } from 'react';
import ReactJson from 'react-json-view';
import { useReactFlow } from 'reactflow';

import { Button, Modal } from 'antd';

type Props = {
    currentData: any;
};

const ModalPreviewExportData = ({ currentData }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const { getEdges, getNodes } = useReactFlow();

    const dataDisplay = {
        id: currentData.id,
        name: currentData.name,
        scripts: {
            // nodes: getNodes(),
            // edges: getEdges()
        }
    };

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
                onClick={() => setOpen(true)}
                type="default"
                className="border border-gray-300 hover:border-gray-400 hover:bg-gray-100"
            >
                Export Data
            </Button>
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

export default ModalPreviewExportData;
