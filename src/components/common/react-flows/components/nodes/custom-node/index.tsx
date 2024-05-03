import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';

import { AiOutlineDelete } from 'react-icons/ai';
import clsx from 'clsx';

import { COMMAND_NODE_LABELS, CommandNode, TypeEdges } from 'components/common/react-flows/constants/enum';
import { IconsBase } from 'components/common/react-flows/constants/icons';

export const CustomNode = ({ data , selected , id}: NodeProps) => {
    const { setNodes, setEdges } = useReactFlow();
    
    const label = COMMAND_NODE_LABELS[data?.command as CommandNode];
    const handleDeleteNode = ( evt: any) => {
        setNodes((nds) => nds.filter((node) => node?.id !== id));
        setEdges( (eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    }

return (
        <div className="relative transition-transform ease-in-out group pt-[16px] ">
         
        <div className='relative'>
            <div className='absolute hidden right-0 -top-[14px] group-hover:block transition-all' >
                <AiOutlineDelete className="text-red-400 " onClick={handleDeleteNode} />
                </div>
            <div
                className={
                    clsx("flex shadow-['0_0_12px_rgba(96 165 250 / 38%)'], gap-1 min-w-24  items-center justify-center p-2 border-2 border-white  rounded text-white bg-[#21bcd3]" , {
                      ["!border-blue-400"]:selected
                    })
                }
            >
                    <span className="inline-flex">{<IconsBase size={16} name={data.icon as string} />}</span>
                    <p className="mb-0 text-sm text-center max-w-32 line-clamp-2 -bottom-6 truncated">
                        {label}
                    </p>
                
            </div>
            <Handle className="!w-2 !h-2 border-white border" type="target" position={Position.Left} />

            <Handle
                className="!w-2 !h-2 !top-[25%] !bg-green-400  border-white border"
                id={TypeEdges.SuccessEdge}
                type="source"
                position={Position.Right}
            />
            <Handle
                className="!w-2 !h-2 !top-[75%] !bg-red-500  border-white border"
                id={TypeEdges.FailedEdge}
                type="source"
                position={Position.Right}
            />
            </div>
        </div>
    );
};
