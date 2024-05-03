import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    ConnectionMode,
    Controls,
    Edge,
    MiniMap,
    Position,
    useEdgesState,
    useNodesState
} from 'reactflow';

import { isEmpty, isEqual } from 'lodash';

import { ModalNode } from './components/modal-nodes';
import { getInitOptions } from './components/nodes/data';
import { EdgeTypes, NodeTypes } from './constants/custom-nodes';
import {
    COMMAND_NODE_ICONS,
    COMMAND_NODE_LABELS,
    CommandNode,
    DefaultId,
    MARKER_TYPE,
    TypeEdges,
    TypeNodes
} from './constants/enum';
import { getTypeNode } from './constants';
import { NodePropsCustom } from './interface';

function findMaxKey(array: any, key: any) {
    return array.reduce((max: number, obj: any) => {
        if (Number.isNaN(Number(obj[key]))) return max;

        return max > Number(obj[key]) ? max : Number(obj[key]);
    }, 1);
}

const id = 1;
const getId = (beginKey = 1) => {
    return `${beginKey++}`;
};

type Props = {
    data: {
        name: string;
        script: {
            edges: [];
            nodes: [];
        };
    };
    onChange: (Node: any) => void;
};

export const ContentDnDFlow = ({ data, onChange }: Props) => {
    const reactFlowWrapper = useRef<any>(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(data?.script?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.script?.edges || []);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [modalNode, setOpenModalNode] = useState<{
        visible: boolean;
        data: NodePropsCustom | null;
    }>({
        visible: false,
        data: null
    });

    const onConnect = useCallback(
        (params: any) => {
            debugger;
            const isSuccess = params?.sourceHandle === TypeEdges.SuccessEdge;
            const isTargetLoopNode = params?.targetHandle === TypeEdges.LoopEdge;
            const target = isTargetLoopNode ? null : params?.target;
            const isSourceDiffLoop = nodes.find((node) => node.id === params?.source)?.type !== TypeNodes.LoopNode;

            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === params?.source) {
                        // it's important that you create a new object here
                        // in order to notify react flow about the change
                        if (node.type === TypeNodes.LoopNode) {
                            node.data = {
                                ...node.data,
                                successNode: isSuccess ? target : node.data?.successNode,
                                loopNode: !isSuccess ? target : node.data?.loopNode
                            };
                        } else {
                            node.data = {
                                ...node.data,
                                successNode: isSuccess ? target : node.data?.successNode,
                                failedNode: !isSuccess ? target : node.data?.failedNode
                            };
                        }
                    } else if (node.id === params.target) {
                        node.data = {
                            ...node.data,
                            sourceId: isTargetLoopNode && isSourceDiffLoop ? null : params.source
                        };
                    }

                    return node;
                })
            );
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        markerEnd: MARKER_TYPE[params?.sourceHandle as unknown as keyof typeof TypeEdges],
                        type: isTargetLoopNode ? TypeEdges.LoopEdgeEnd : params?.sourceHandle,
                        animated: true
                    },
                    eds
                )
            );

            return params;
        },
        [nodes, setEdges, setNodes]
    );

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleOnDeleteNode = useCallback(
        (id: any) => {
            setNodes((nds) => nds.filter((node) => node?.id !== id));
            setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
        },
        [setNodes, setEdges]
    );

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const command = event.dataTransfer.getData('application/reactflow');
            // check if the dropped element is valid
            if (typeof command === 'undefined' || !command) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top
            });

            const temp = nodes?.filter((node) => node?.id !== DefaultId.start && node?.id !== DefaultId.end);
            const maxKey: number = temp?.length > 0 ? findMaxKey(temp, 'id') : 0;
            const newNode: NodePropsCustom = {
                id: `${maxKey + 1}`,
                position,
                label: `${COMMAND_NODE_LABELS[command as CommandNode]}`,
                data: {
                    icon: COMMAND_NODE_ICONS[command as CommandNode],
                    command,
                    failedNode: null,
                    successNode: null,
                    loopNode: null,
                    options: getInitOptions(command as CommandNode),
                    variables: {},
                    settings: {
                        nodeTimeout: '0',
                        nodeSleep: '0'
                    },
                    description: ''
                    // onDeleteNode: handleOnDeleteNode
                },
                type: getTypeNode(command as CommandNode),
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                style:
                    command === CommandNode.Stop
                        ? {
                              width: '60px',
                              height: '60px',
                              backgroundColor: '#d03a52',
                              color: '#fff',
                              boxShadow: 'rgb(208 58 82 / 38%) 0px 0px 12px',
                              borderRadius: '50%'
                          }
                        : {}
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [nodes, reactFlowInstance, setNodes]
    );

    const handleOnClickNode = useCallback(
        (e: any, node: NodePropsCustom) => {
            // if ([TypeNodes.EndNode].includes(node?.type as any)) return;
            setOpenModalNode({
                visible: true,
                data: node
            });
        },
        [setOpenModalNode]
    );

    const isValidConnection = (connection: Connection) => {
        //    check connection loop only 1 connection source

        // if (connection.sourceHandle === TypeEdges.LoopEdge) {
        // check is exist connection

        // }

        if (connection.targetHandle === TypeEdges.FailedEdge || connection.targetHandle === TypeEdges.SuccessEdge) {
            return false;
        }
        if (connection.targetHandle === TypeEdges.LoopEdge) {
            return true;
        }
        if (connection.source === DefaultId.end) {
            const isExistConnection = edges.some((edge) => edge.source === connection.source);
            if (isExistConnection) {
                return false;
            }
        }
        const isExistConnection = edges.some(
            (edge) => edge.source === connection.source && edge.type === connection.sourceHandle
        );
        if (isExistConnection) {
            return false;
        }

        return true;
    };

    const handleSaveNode = (node: NodePropsCustom) => {
        const findIndex = nodes.findIndex((item) => item.id === node.id);
        if (findIndex > -1) {
            nodes[findIndex] = node;
            setNodes([...nodes]);
        }
        setOpenModalNode({
            data: null,
            visible: false
        });
    };
    const handleSetVariables = (newVariables: any) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === DefaultId.start) {
                    node.data = {
                        ...node.data,
                        variables: { ...node.data?.variables, ...newVariables }
                    };
                }

                return node;
            })
        );
    };
    // initial data
    useEffect(() => {
        if (data?.script?.nodes?.length > 0) {
            setNodes(
                [...data.script?.nodes]?.map((item: any) => ({
                    ...item,
                    data: {
                        ...item.data,
                        options: isEmpty(item.data?.options) ? getInitOptions(item.data.command) : item.data?.options,
                        variables: item.data?.variables || {},
                        settings: item.data?.settings || {},
                        description: item.data?.description || ''
                    }
                }))
            );
            setEdges(data.script?.edges);
        }
    }, [data, setEdges, setNodes]);

    useEffect(() => {
        if (isEqual(nodes, data.script?.nodes) && isEqual(edges, data.script?.edges)) return;
        onChange({ nodes, edges });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes, edges]);

    const globalVariablesNodeChoose = useMemo(() => {
        if (!modalNode.data) {
            return {};
        }

        const getPreviousNodeVariables = (node: NodePropsCustom, nodes: NodePropsCustom[], nodeUsed: any): any => {
            // const previousNode = nodes.find((item: NodePropsCustom) => item.id === node?.data?.sourceId);
            // const tempVariables = previousNode?.data?.variables || {};
            if (!node?.id || nodeUsed[node?.id]) return {};
            nodeUsed[node.id] = true;
            const sourceEdge = edges?.filter((edge: any) => edge.target === node?.id);
            if (!isEmpty(sourceEdge)) {
                let result = {};

                sourceEdge?.forEach((edge: Edge) => {
                    const previousNode = nodes.find(
                        (item: NodePropsCustom) => item?.id === edge.source
                    ) as NodePropsCustom;

                    const previousVariables: any = previousNode?.data?.variables || {};

                    if (
                        previousNode.type === TypeNodes.LoopNode &&
                        previousNode.data?.loopId === node?.id &&
                        (previousNode.data?.options?.loopType === 'forEach' ||
                            previousNode.data?.options?.loopType === 'for')
                    ) {
                        console.log({ previousNode, node, edge }, '====');
                        previousVariables['@{currentItem}'] = '';
                        previousVariables['@{currentIndex}'] = 0;
                    }
                    result = {
                        ...result,
                        ...previousVariables,
                        ...getPreviousNodeVariables(previousNode, nodes, nodeUsed)
                    };
                });

                return result;
            }

            return {};
        };

        if (modalNode.data.type === TypeNodes.LoopNode) {
        }
        const nodeUsed: any = {};

        return getPreviousNodeVariables(modalNode?.data, nodes, nodeUsed);
    }, [modalNode?.data, nodes, edges]);

    return (
        <div className="w-full h-full p-2 border rounded-e" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                // onSelectionChange={(e) => console.log(e)}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={NodeTypes}
                isValidConnection={isValidConnection}
                edgeTypes={EdgeTypes}
                // onClick={handleOnClick}
                onNodeDoubleClick={handleOnClickNode}
                // onSelect={handleOnSelectedNode}\
                connectionMode={ConnectionMode.Loose}
                fitView
            >
                <Background variant={BackgroundVariant.Dots} />
                <Controls />
                <MiniMap />
                <svg>
                    <defs>
                        <linearGradient id="edge-gradient">
                            <stop offset="0%" stopColor="#2a8af6" />
                            <stop offset="100%" stopColor="#2a8af6" />
                        </linearGradient>

                        <marker
                            id="edge-circle"
                            viewBox="-5 -5 10 10"
                            refX="0"
                            refY="0"
                            markerUnits="strokeWidth"
                            markerWidth="10"
                            markerHeight="10"
                            orient="auto"
                        >
                            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
                        </marker>
                    </defs>
                </svg>
            </ReactFlow>
            <ModalNode
                open={modalNode.visible}
                onClose={() =>
                    setOpenModalNode({
                        data: null,
                        visible: false
                    })
                }
                onDelete={handleOnDeleteNode}
                onSave={handleSaveNode}
                data={modalNode.data}
                variables={globalVariablesNodeChoose || {}}
                onSetVariables={handleSetVariables}
            />
        </div>
    );
};
