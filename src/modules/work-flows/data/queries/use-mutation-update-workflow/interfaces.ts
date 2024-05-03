import { EdgeProps } from "reactflow"

import { NodePropsCustom } from "components/common/react-flows/interface"

export interface UpdateWorkflowParams {
  id: string
  name: string
  script: ScriptWorkflow
}

export interface UpdateWorkflowResponseData {

}
export interface ScriptWorkflow {
  nodes: NodePropsCustom[]
  edges:EdgeProps[]
}