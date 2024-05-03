import { Handle, NodeProps, Position } from 'reactflow';

import { Space } from 'antd';

import { TypeEdges } from 'components/common/react-flows/constants/enum';
import { IconsBase } from 'components/common/react-flows/constants/icons';

export const DefaultNodes = ({ data }: NodeProps) => {
    return (
        <>
            <Handle className="!w-2 !h-2 !-left-[3px]" type="target" position={Position.Left} />
            <div
                className="flex min-w-[100px] flex-col items-center justify-center p-2 
            bg-white border rounded hover:border-blue-300"
            >
                <Space>
                    <span>{<IconsBase name={data?.icon} />}</span>
                    <span className="truncate">{data?.label}</span>
                </Space>
            </div>
            <Handle
                className="!w-2 !h-2 !top-[25%] !bg-green-500 !-right-[4px]"
                id={TypeEdges.SuccessEdge}
                type="source"
                position={Position.Right}
            />
            <Handle
                className="!w-2 !h-2 !top-[75%] !bg-red-500 !-right-[4px]"
                id={TypeEdges.FailedEdge}
                type="source"
                position={Position.Right}
            />
        </>
    );
};
