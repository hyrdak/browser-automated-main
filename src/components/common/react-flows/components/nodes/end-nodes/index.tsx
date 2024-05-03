import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import { AiOutlineStop } from 'react-icons/ai';

import { COMMAND_NODE_LABELS, CommandNode } from 'components/common/react-flows/constants/enum';

export const EndNodes = (props: NodeProps) => {
    const { data } = props;
    const label = COMMAND_NODE_LABELS[data?.command as CommandNode];

    return (
        <>
            <Handle type="target" className="bg-red-500 !w-2 !h-2 !-right-[5px]" position={Position.Left} />
            <div className="flex items-center justify-center w-full h-full ">
                {' '}
                <div className="flex items-center gap-2">
                    <AiOutlineStop />
                    <span>{label}</span>
                </div>
            </div>
        </>
    );
};
