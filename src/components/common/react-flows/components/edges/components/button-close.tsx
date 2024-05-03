import React from 'react';

import { Alert, Button, FloatButton } from 'antd';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

type Props = {
    onEdgeClick: (event: React.MouseEvent) => void;
    // labelX: number;
    // labelY: number;
    type?: 'remove' | 'add';
    color?: string;
    position?: 'start' | 'end';
        sourceX: number;
        sourceY: number;
        targetX: number;
        targetY: number;
    
};

const ButtonClose = ({ onEdgeClick,position, 
    sourceX, sourceY, targetX, targetY
    , type = 'remove' , color = "red", }: Props) => {
    const isRemove = type === 'remove';

    const labelX =  position === "start" ? sourceX + 20 : targetX - 20;
    const labelY =  position === "start" ? sourceY : targetY
    
return (
        <div
            style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                fontSize: 12,
                // everything inside EdgeLabelRenderer has no pointer events by default
                // if you have an interactive element, set pointer-events: all
                pointerEvents: 'all'
            }}
            onClick={onEdgeClick}
            className="group"
        >
            <Button
                type="dashed"
                shape="circle"
                // danger={!!isRemove}
                 className={`text-${color} opacity-0 group-hover:!opacity-100`}
                size="small"
                icon={
                    isRemove ? (
                        <AiOutlineClose style={{ verticalAlign: '-0.125em' }} />
                    ) : (
                        <AiOutlinePlus style={{ verticalAlign: '-0.125em' }} />
                    )
                }
            />
        </div>
    );
};

export default ButtonClose;
