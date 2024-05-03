import { Handle, NodeProps, Position } from 'reactflow';

import { AiOutlineFlag, AiOutlineStop } from 'react-icons/ai';
import clsx from 'clsx';

import { COMMAND_NODE_LABELS, CommandNode, TypeEdges } from 'components/common/react-flows/constants/enum';

export const InitNode = (props: NodeProps) => {
    const { data } = props;
    const label = COMMAND_NODE_LABELS[data?.command as CommandNode];
const isStart = data?.command === CommandNode.Start;

    return (
        <>
        {
             !isStart &&
            <Handle type="target" className="bg-red-500 !w-2 !h-2 !-right-[5px]" position={Position.Left} />
        }
            <div className={clsx("flex items-center justify-center w-full h-full " , )}>
                {' '}
                <div className="flex items-center gap-2">
                    {isStart ?  <AiOutlineFlag /> :   <AiOutlineStop />}
                    <span>{label}</span>
                </div>
            </div>
            {
                isStart &&
                <Handle
                    id={TypeEdges.SuccessEdge}
                    type="source"
                    className="bg-[#36ad6a] !w-2 !h-2 !-right-[5px] border border-white z-10"
                    position={Position.Right}
                />
            }
        </>
    );
};
