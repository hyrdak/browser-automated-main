import { CustomNode, DefaultNodes, InitNode, LoopNode } from '../components';
import ButtonEdge from '../components/edges/button-edge';
import EdgeCustom from '../components/edges/edge-custom';
import EdgeLoop from '../components/edges/edge-loop';
import FloatingEdge from '../components/edges/floating-edge';
import TextEdge from '../components/edges/text-edge';
import { TypeEdges, TypeNodes } from './enum';

export const NodeTypes = {
    [TypeNodes.StartNode]: InitNode,
    [TypeNodes.EndNode]: InitNode,
    [TypeNodes.DefaultNode]: DefaultNodes,
    [TypeNodes.CustomNode]: CustomNode,
    [TypeNodes.LoopNode]: LoopNode,
    [TypeNodes.HelpNode]: DefaultNodes
};
export const EdgeTypes = {
    [TypeEdges.ButtonEdge]: ButtonEdge,
    [TypeEdges.TextEdge]: TextEdge,
    [TypeEdges.SuccessEdge]: EdgeCustom,
    [TypeEdges.FailedEdge]: EdgeCustom,
    [TypeEdges.LoopEdge]: EdgeCustom,
    [TypeEdges.LoopEdgeEnd]: EdgeCustom,
    [TypeEdges.CustomEdge]: FloatingEdge
};
