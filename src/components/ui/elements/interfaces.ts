
import { CheckboxProps, InputProps, RadioGroupProps, SelectProps, SwitchProps } from "antd";
import { TextAreaProps } from "antd/es/input";

import { OptionNode } from "components/common/react-flows/interface";

import { ElementType } from "./constants/enum";
import { InputCompactProps } from "./items/input-compact";



export type ItemElement = (ItemCollapseForm | ItemCodeEditor | ItemUpload | ItemCheckbox | ItemSwitch | ItemInputCompact | ItemSelect | ItemInput | ItemRadioGroup | ItemInputNumber |  ItemTextarea) & {
    // condition?: Array<Condition>,
    layout?:{
      col?: any,
      [x:string]: any
    }
    rules?: any,
    label:string,
    name: OptionNode | string,
    help?:  string,
    isUsingVariables?: boolean,
    conditionShow?:{
      condition:OptionNode[] | any,
      conditionValue: any
    }
    
}

export interface Condition {
    conditionShow: OptionNode[] | any,
    elements: ItemElement[]
}


export interface ItemSelect  {
    elementType?: ElementType.Select,
    type?: ElementType.Select,
    props: SelectProps,
  }
export interface ItemInput  {
    elementType?: ElementType.Input,
    type?: ElementType.Input,
    props: InputProps,
  }

export interface ItemRadioGroup  {
    elementType?: ElementType.RadioGroup,
    type?: ElementType.RadioGroup,
    props: RadioGroupProps,
   
  }
export interface ItemInputNumber  {
    elementType?: ElementType.InputNumber,
    type?: ElementType.InputNumber,
    props: InputProps,
  }
export interface ItemTextarea  {
    elementType?: ElementType.Textarea,
    type?: ElementType.Textarea,
    props: TextAreaProps,
  }

export interface ItemInputCompact  {
    elementType?: ElementType.InputCompact,
    type?: ElementType.InputCompact,
    props: InputCompactProps,
  }
export interface ItemSwitch  {
    elementType?: ElementType.Switch,
    type?: ElementType.Switch,
    props: SwitchProps,
  }
export interface ItemCheckbox  {
    elementType?: ElementType.Checkbox,
    type?: ElementType.Checkbox,
    props: CheckboxProps,
  }

  export interface ItemUpload  {
    elementType?: ElementType.UploadFile,
    type?: ElementType.UploadFile,
    props: any,
  }
  export interface ItemCodeEditor  {
    elementType?: ElementType.CodeEditor,
    type?: ElementType.CodeEditor,
    props: any,
  }
  export interface ItemCollapseForm  {
    elementType?: ElementType.Collapse,
    type?: ElementType.Collapse,
    props: any,
  }