import { Position } from 'reactflow';

import { NodePropsCustom } from '../interface';
import { COMMAND_NODE_LABELS, CommandNode, DefaultId, KindNode, TypeBegin, TypeNodes } from './enum';

export const initialNodes: NodePropsCustom[] = [
    {
        id: DefaultId.start,
        type: TypeNodes.StartNode,
        position: {
            x: 100,
            y: 100
        },
        label: COMMAND_NODE_LABELS[CommandNode.Start],
        // command: 'start',
        // identification: TypeBegin.start,
        // successId: DefaultId.end,
        // failedId: DefaultId.end,
        data: {
            command: CommandNode.Start,
            failedNode: null,
            successNode: null,
            options: {}
        },
        targetPosition: Position.Left,
        style: {
            width: '60px',
            height: '60px',
            backgroundColor: '#36ad6a',
            color: '#fff',
            boxShadow: 'rgb(59 178 85 / 38%) 0px 0px 12px',
            // 'react-flows-node-color': '#36ad6a',
            // '--react-flows-handle': '#62fcaf',
            borderRadius: '50%',
            border: 'none'
        }
    },

];
export const getTypeNode = (type: CommandNode) => {
    switch (type) {
        case CommandNode.Start:
            return TypeNodes.StartNode;
        case CommandNode.Stop:
            return TypeNodes.EndNode;
        case CommandNode.Loop:
            return TypeNodes.LoopNode;
        default:
            return TypeNodes.CustomNode;
    }
};

export const getListCommandNode = (kind: KindNode) => {
    switch (kind) {
        case KindNode.Navigation:
            return [CommandNode.OpenUrl, CommandNode.ReloadPage];
        case KindNode.Mouse:
            return [CommandNode.Click, CommandNode.Scroll, CommandNode.MouseMovement];
        case KindNode.Data:
            return [
                CommandNode.Random,
                CommandNode.UploadFile,
                CommandNode.ElementExists,
                CommandNode.GetUrl,
                CommandNode.Spreadsheet,
                CommandNode.Fetch,
                CommandNode.SetVariables
            ];
        case KindNode.Keyboard:
            return [CommandNode.TypeText, CommandNode.PressKey];
        default:
            return [
                CommandNode.Stop,
                CommandNode.If,
                CommandNode.Sleep,
                CommandNode.Loop,
                CommandNode.Javascript,
                CommandNode.Custom
            ];
    }
};

export const getValueOfKey = (key: string) => {
    
    return key.match(/@{(.*)}/)?.[1] || key;
};
