import ReactJson from 'react-json-view';
import { useSelector } from 'react-redux';
import { useReactFlow } from 'reactflow';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'libs/redux';

import { Divider, Space, Typography } from 'antd';

export const RightSidebar = () => {
    const { getEdges, getNodes } = useReactFlow();
    const params = useParams();
    const { data: dataReactFlow } = useAppSelector((state) => state.reactFlow);

    const reactFlowSelected = dataReactFlow.find((item: any) => item.id + '' === (params?.id as string)) || {};

    return (
        <>
            <aside
                className="flex flex-col p-0 border shadow"
                style={{
                    height: 'calc(100vh - 64px)'
                }}
            >
                <div className="p-4">
                    <Typography.Text strong className="!mb-1 text-2xl">
                        {reactFlowSelected.name}
                    </Typography.Text>
                </div>
                <Divider className="!my-2" />
                <div className="p-4 overflow-y-auto flex-grow-1 ">
                    <Space direction="vertical">
                        <div>
                            <h3>
                                <b>Data Compile:</b>
                            </h3>
                            <ReactJson
                            displayDataTypes={false}
                            name={null}
                            collapsed
                                src={{
                                    ...reactFlowSelected,
                                    script: {
                                        ...reactFlowSelected?.script,
                                        nodes: getNodes(),
                                        edges: getEdges()
                                    }
                                }}
                            />
                        </div>
                    </Space>
                </div>
            </aside>
        </>
    );
};
