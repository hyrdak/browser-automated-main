import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, SmoothStepEdge, useReactFlow } from 'reactflow';

import { AiOutlineClose } from 'react-icons/ai';

import './styles.css';

export default function ButtonEdge(props: EdgeProps) {
    return (
        <>
            <SmoothStepEdge {...props} />
        </>
    );
}
