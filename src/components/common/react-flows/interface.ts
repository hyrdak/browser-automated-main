import { Node } from "reactflow";

import { ItemElement } from "components/ui/elements/interfaces";

import { CommandNode, Identification } from "./constants/enum";

export interface NodePropsCustom extends Node {
    label?:string,
    name?:string,
    data:{
        options?:OptionNode,
        settings?:SettingNode,
        variables?:VariablesNode,
        note?:NoteNode,
        command:CommandNode | null,
        onDeleteNode?: (id: string) => void,
        failedNode?:string | null,
        successNode?:string | null,
        loopId?:string | null,
        // targetId:string
        sourceId?:string | null
        [key:string]:any
    }
    
}

export interface OptionNode  {
    loopType?: string;
    enableGhostCursor?: boolean;
    nodeSleep?: string;
    nodeTimeout?: string;
    timeoutNextNode?: string;
    buttonType?: string; // left, center, right
    selectType?: string, // css, xpath, text , coordinates
    
    x?: string, // x coordinate
    y?: string, // y coordinate,
    selectorData?: string, //value of selector type 
  
    timeout?: string, //timeout for wait for selector
    clickCount?: string, //number of clicks
}
export interface SettingNode  {
    nodeSleep?: string;
    nodeTimeout?: string;
    timeoutNextNode?: string;
}
export interface VariablesNode  {
    nodeSleep?: string;
    nodeTimeout?: string;
    timeoutNextNode?: string;
}
export interface NoteNode  {
    description?: string;
}

export type CommandModalProps = {
    [k in CommandNode]:  Array<ItemElement>
  };