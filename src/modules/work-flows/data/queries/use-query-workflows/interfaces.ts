import { EdgeProps } from "reactflow"

import { NodePropsCustom } from "components/common/react-flows/interface"


export interface WorkflowRequest   {}

export interface WorkflowResponse  {
  data:{  
    id: string
    name: string
    script: ScriptWorkflow}[]
}

export interface ScriptWorkflow {
    nodes: NodePropsCustom[]
    edges:EdgeProps[]
}