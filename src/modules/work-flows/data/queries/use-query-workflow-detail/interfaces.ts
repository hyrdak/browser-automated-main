import { EdgeProps } from "reactflow"

import { NodePropsCustom } from "components/common/react-flows/interface"


export interface WorkflowDetailRequest   {
  select: string,
  id?: string,
}

export interface WorkflowDetailResponse  {
  data:{  id: string
    name: string
    script: ScriptWorkflow}[]
}

interface ScriptWorkflow {
    nodes: NodePropsCustom[]
    edges:EdgeProps[]
}