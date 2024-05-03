import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, SmoothStepEdge, useReactFlow } from 'reactflow';

import { Drawer } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';

import { TypeEdges } from 'components/common/react-flows/constants/enum';

import ButtonClose from '../components/button-close';

export default function EdgeLoop(props: EdgeProps) {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        sourceHandleId,
        source,
        target,
        markerEnd
    } = props;
    const { getEdges, setEdges, setNodes } = useReactFlow();

    const handleEdgeClick = (evt: any) => {
        const edges = getEdges();
        const edgesRemoved = edges.find((edge) => edge.id === id);
        const newEdges = edges.filter((edge) => edge.id !== id);
        setEdges(newEdges);
        if (!!edgesRemoved) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === edgesRemoved.source) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        node.data = {
                            ...node.data,
                            successNode: edgesRemoved.type === TypeEdges.SuccessEdge ? null : node.data.successNode,
                            failedNode: edgesRemoved.type === TypeEdges.FailedEdge ? null : node.data.failedNode,
                            loopNode: edgesRemoved.type === TypeEdges.LoopEdge ? null : node.data.loopNode
                        };
                    }
                    if (node.id === edgesRemoved.target) {
                        node.data = {
                            ...node.data,
                            sourceId: null
                        };
                    }

                    return node;
                })
            );
        }
        evt.preventDefault();
    };

    const [_edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });
    const radiusX = (sourceX - targetX) * 0.6;
    const radiusY = 50;
    const edgePath = `M ${targetX + 5} ${targetY} L A ${0} ${0} 0 1 0 ${sourceX - 5} ${sourceY}`;

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
 
            {/* <div className="border">
                <EdgeLabelRenderer>
                    <ButtonClose labelX={sourceX} labelY={sourceY} onEdgeClick={handleEdgeClick} type="remove" />
                </EdgeLabelRenderer>
            </div> */}
        </>
    );
}
