import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

import { Input } from 'antd';

export default function TextEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });
    const [isEdit, setIsEdit] = React.useState(false);
    const [stateValue, setStateValue] = React.useState('Text');
    const [labelValue, setLabelValue] = React.useState('Text');
    const toggleEdit = () => {
        setIsEdit(!isEdit);
        // setStateValue(labelValue);
    };
    const handleSave = (e: any) => {
        setIsEdit(false);
        setLabelValue(e.target.value);
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        // position: 'absolute',
                        // transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all'
                    }}
                    className="bg-white nodrag nopan"
                >
                    {isEdit ? (
                        <Input
                            size="small"
                            className="w-[100px] text-sm border border-gray-300 rounded-sm"
                            // bordered={false}
                            onBlur={handleSave}
                            defaultValue={labelValue}
                        />
                    ) : (
                        <span onClick={toggleEdit}>{labelValue}</span>
                    )}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
