import { EdgeProps } from "reactflow"

import { NodePropsCustom } from "components/common/react-flows/interface"

export interface CreateWorkflowBody {
  name: string
  script: ScriptWorkflow
}

export interface CreateWorkflowResponseData {

}
export interface ScriptWorkflow {
  nodes: NodePropsCustom[]
  edges:EdgeProps[]
}