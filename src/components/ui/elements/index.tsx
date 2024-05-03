import { Checkbox, CheckboxProps, InputProps, Radio, Select, Switch, SwitchProps } from 'antd';
import { TextAreaProps } from 'antd/es/input/TextArea';
import { flatten } from 'lodash';

import { ElementType } from './constants/enum';
import CodeEditor from './items/codemirror-editor';
import CollapseForm from './items/collapse-form';
import { InputCompact, InputCompactProps } from './items/input-compact';
import UploadFile from './items/upload-file';

type ElementsProps = {
    [key in ElementType]: (props: any) => JSX.Element;
};

export const Elements: ElementsProps = {
    [ElementType.Input]: (props: any) => (
        <InputCompact
            inputProps={{ ...props }}
            items={flatten([props.globalVariables])}
            inputType="Input"
        />  
    ),
    [ElementType.Select]: (props: any) => <Select {...props}
        showSearch
        allowClear
        filterOption={(input:any, option:any) => {
           return (option?.[props?.fieldNames?.label || "label"] ?? '').includes(input)
        }}
   
    />,
    [ElementType.RadioGroup]: (props: any) => <Radio.Group {...props} />,
    [ElementType.InputNumber]: (props: InputProps & { globalVariables?: any[] }) => {
        return (
            <InputCompact
                items={flatten([props.globalVariables])}
                inputProps={{
                    ...props,
                    style: {
                        width: '100%',
                        ...props.style
                    }
                }}
                inputType="InputNumber"
            />
        );
    },
    [ElementType.Textarea]: (props: TextAreaProps & { globalVariables: any[] }) => (
        <InputCompact inputProps={{ ...props }} inputType="TextArea" items={flatten([props.globalVariables])} />
    ),
    [ElementType.InputCompact]: (props: InputCompactProps & { globalVariables?: any[] }) => (
        <InputCompact {...props} items={flatten([props.items || [], props.globalVariables ||[]])} />
    ),
    [ElementType.Switch]: (props: SwitchProps) => <Switch {...props} />,
    [ElementType.Checkbox]: (props: CheckboxProps) => <Checkbox {...props} />,
    [ElementType.UploadFile]: (props: any) => <UploadFile {...props} />,
    [ElementType.CodeEditor]: (props: any) => <CodeEditor {...props} />,
    [ElementType.Collapse]: (props: any) => <CollapseForm {...props} />
};
