import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, SmoothStepEdge, useReactFlow } from 'reactflow';

import { AiOutlineClose } from 'react-icons/ai';

import { MARKER_TYPE, TypeEdges } from 'components/common/react-flows/constants/enum';

import ButtonClose from '../components/button-close';

export default function EdgeCustom({
    // id,
    // sourceX,
    // sourceY,
    // targetX,
    // targetY,
    // sourcePosition,
    // targetPosition,
    style = {},
    // sourceHandleId,
    // markerEnd

    id,
    sourceHandleId,
    ...props
}: EdgeProps) {
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
                            failedNode: edgesRemoved.type === TypeEdges.FailedEdge ? null : (node.data.failedNode ),
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

    const { source, target } = props;

    const [edgePath,targetX , ] = getBezierPath({
        ...props
    });
    if (id === target) {
        console.log('edgePath', 'loop');
    }

    return (
        <>
            <SmoothStepEdge
                id={sourceHandleId as string}
                {...props}
                // path={edgePath}
                // markerEnd={markerEnd}
                style={{
                    stroke: MARKER_TYPE[sourceHandleId as TypeEdges]?.color,
                    strokeWidth: 2,
                    ...style
                }}
                // label={'Failed'}
                
            />
            <EdgeLabelRenderer >
                <ButtonClose
                    color={MARKER_TYPE[sourceHandleId as TypeEdges]?.color}
                    // labelX={props.sourceX}
                    // labelY={props.sourceY}
                    {...props}
                    position='start'
                    onEdgeClick={handleEdgeClick}
                />
                 {/* <ButtonClose
                    color={MARKER_TYPE[sourceHandleId as TypeEdges]?.color}
                    // labelX={props.targetX }
                    // labelY={props.targetY}
                    {...props}
                    position='end'
                    onEdgeClick={handleEdgeClick}
                /> */}
            </EdgeLabelRenderer>
        </>
    );
}
