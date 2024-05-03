import { Handle, NodeProps, Position } from 'reactflow';

import clsx from 'clsx';

import { COMMAND_NODE_LABELS, CommandNode, TypeEdges } from 'components/common/react-flows/constants/enum';
import { IconsBase } from 'components/common/react-flows/constants/icons';

const DEFAULT_HANDLE_STYLE = {
    width: 10,
    height: 10
};

export const LoopNode = ({ data, selected }: NodeProps) => {
    const label = COMMAND_NODE_LABELS[data?.command as CommandNode];

    return (
        <div className="group">
            <Handle
                className="border-none "
                type="target"
                position={Position.Left}
                style={{
                    ...DEFAULT_HANDLE_STYLE
                }}
            />
            <div
                className={clsx(
                    'border-2 flex w-[60px] h-[60px] rounded-full flex-col items-center justify-center p-2 text-white bg-[#21bcd3]',
                    {
                        ' border-blue-500': selected
                    }
                )}
            >
                <div className="flex items-center gap-2">
                    <span className="inline-flex">{<IconsBase name={data.icon as string} />}</span>
                    <span>{label}</span>
                </div>
            </div>
            <Handle
                className=" !bg-green-400 !top-[25%] border-white"
                id={TypeEdges.SuccessEdge}
                type="source"
                title="Success"
                position={Position.Right}
                style={{
                    ...DEFAULT_HANDLE_STYLE
                }}
            />
            <Handle
                className="bg-orange-500 !top-[75%]  border-white"
                id={TypeEdges.LoopEdge}
                type="source"
                title="Loop"
                position={Position.Right}
                style={{
                    ...DEFAULT_HANDLE_STYLE
                }}
            />
        </div>
    );
};
