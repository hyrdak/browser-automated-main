import React from 'react';
import { MarkerType } from 'reactflow';

import { LuMousePointerClick } from 'react-icons/lu';

export type Identification = TypeOther | TypeMouse | TypeNavigation | TypeBegin | "custom"

export enum TypeBegin {
    start = 'start',
    end = 'end',
}

export enum TypeNavigation {
    ActiveTab = 'activeTab',
    CloseTab = 'closeTab',
    ReloadTab = 'reloadTab',
}
export enum TypeMouse {
    Click = 'click',
    MouseMovement = 'mouseMovement',
    Scroll = 'scroll',
}
export enum TypeOther {
    Pause = 'pause',
    If = 'if',
    Eval = 'eval',
    While = 'while',
    For = 'for',
    AddComment = 'addComment',
    Stop = 'stop',
}




export enum TypeNodes { 
    StartNode = 'input',
    EndNode = 'output',
    StopNode = 'stopNode',
    DefaultNode = 'defaultNode',
    CustomNode = 'custom',
    LoopNode = 'loop',
    HelpNode = 'helper',
}

export enum TypeEdges { 
    ButtonEdge = 'buttonEdge',
    TextEdge = 'textEdge',
    SuccessEdge = 'successEdge',
    FailedEdge = 'failedEdge',
    CustomEdge = 'custom',
    LoopEdge = 'loopEdge',
    LoopEdgeEnd = 'loopEdgeEnd',
}

export enum DefaultId {
    start = 'start',
    end = 'end',
}

export const MARKER_TYPE: {
    [x:string] : any
} =  { 
    [TypeEdges.SuccessEdge]: {
        type: MarkerType.ArrowClosed,
        color: "#52c41a",
    },
    [TypeEdges.FailedEdge]: {
        type: MarkerType.ArrowClosed,
        color: "#f5222d",
    },
    [TypeEdges.TextEdge]: {
        type: MarkerType.ArrowClosed,
    },
    [TypeEdges.ButtonEdge]: {
        type: MarkerType.ArrowClosed,
    },
    [TypeEdges.LoopEdge]: {
        type: MarkerType.ArrowClosed,
        color: "orange",
    },
    [TypeEdges.LoopEdgeEnd]: {
        type: MarkerType.ArrowClosed,
        color: "orange",
    },
}

export enum CommandNode  {
   Start =  'start',
   Stop =  'stop',
   NewTab =  'newTab',
   Variables =  'variables',
   Click =  'click',
   OpenUrl = 'openUrl',
   Scroll = 'scroll',
   Random = 'random',
   MouseMovement = 'mouseMovement',
   If = 'if',
   Sleep='delay',
   Loop = "loop",
   ReloadPage = "reloadPage",
   UploadFile  = "fileUpload",
   ElementExists = "elementExists",
   TypeText = "typeText",
   PressKey = "pressKey",
   GetUrl = "getUrl",
   Spreadsheet = "spreadsheet",
   Javascript= "javascript",
   Fetch =  "fetch",
   SetVariables =  'setVariables',
   Custom = "custom",
} 
export const COMMAND_NODE_LABELS  = {
    [CommandNode.Start]: 'Start',
    [CommandNode.Stop]: 'Stop',
    [CommandNode.NewTab]: 'New Tab',
    [CommandNode.Variables]: 'Variables',
    [CommandNode.Click]: 'Click',
    [CommandNode.OpenUrl]: 'Open Url',
    [CommandNode.Scroll]: 'Scroll',
    [CommandNode.Random]: 'Random',
    [CommandNode.MouseMovement]: 'Mouse Movement',
    [CommandNode.If]: 'If',
    [CommandNode.Sleep] : 'Sleep',
    [CommandNode.Loop] : 'Loop',
    [CommandNode.ReloadPage] : 'Reload Page',
    [CommandNode.UploadFile] : 'Upload File',
    [CommandNode.ElementExists] : 'Element Exists',
    [CommandNode.TypeText] : 'Type Text',
    [CommandNode.PressKey] : 'Press Key',
    [CommandNode.GetUrl] : 'Get Url',
    [CommandNode.Spreadsheet] : 'Spreadsheet',
    [CommandNode.Javascript]: 'Javascript',
    [CommandNode.Fetch]: 'HTTP Request',
    [CommandNode.SetVariables]:'Set Variables',
    [CommandNode.Custom]: 'Custom',
    
} 
export const COMMAND_NODE_ICONS  = {
    [CommandNode.Start]: 'AiOutlineFlag',
    [CommandNode.Stop]: 'AiOutlineStop',
    [CommandNode.NewTab]: '',
    [CommandNode.Variables]: '',
    [CommandNode.Click]: 'PiCursorClick',
    [CommandNode.OpenUrl]: 'AiOutlineLink',
    [CommandNode.Scroll]: 'CgScrollV',
    [CommandNode.Random]: 'GiPerspectiveDiceSixFacesRandom',
    [CommandNode.MouseMovement]: 'LuMove',
    [CommandNode.If]: 'AiOutlineQuestionCircle',
    [CommandNode.Sleep] : 'PiEyeClosedDuotone',
    [CommandNode.Loop] : 'MdLoop',
    [CommandNode.ReloadPage] : 'AiOutlineReload',
    [CommandNode.UploadFile] : 'AiOutlineFile',
    [CommandNode.ElementExists] : 'LiaElementor',
    [CommandNode.TypeText] : 'PiTextT',
    [CommandNode.PressKey] : 'FaRegKeyboard',
    [CommandNode.GetUrl] : 'PiLinkLight',
    [CommandNode.Spreadsheet] : 'LuFileSpreadsheet',
    [CommandNode.Javascript] : 'FaCode',
    [CommandNode.Fetch]: 'PiPlugsConnectedThin',
    [CommandNode.SetVariables]:"LuVariable",
    [CommandNode.Custom]: 'VscJson',
} 

export enum KindNode {
    // Action = 'action',
    Navigation = 'navigation',
    Mouse = 'mouse',
    Data = 'data',
    Keyboard = 'keyboard',
    Other = 'other',

}

