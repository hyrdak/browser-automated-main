import { useCallback } from 'react';
import { getBezierPath, getMarkerEnd, getSmoothStepPath, SmoothStepEdge, useStore } from 'reactflow';

import { getEdgeParams } from './util';

function FloatingEdge({ id, source, target, markerEnd, style , ...otherProps }: any) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    // const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);
    const {sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        data,
        arrowHeadType,
        markerEndId,} =  otherProps
    const [path , labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
            sourceX:-sourceX,
            sourceY:sourceY,
            targetX:targetX,
            targetY:targetY,
            centerX : 0,
            centerY : 0,
            offset: 0,
            sourcePosition, 
            targetPosition,
    });
   
          
return (
        <g>
        <path style={style} className="react-flow__edge-path" d={path} markerEnd={markerEnd} />
        
      </g>
    );
}

export default FloatingEdge;
