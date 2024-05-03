import React, { useEffect, useMemo } from 'react';

import { Button, Dropdown, Input, InputNumber, MenuProps, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { isEmpty } from 'lodash';

import CodeEditor from '../codemirror-editor';
import DropDownRender from './dropdown-render';

export type InputCompactProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    defaultValue?: string | null;
    items?: MenuProps['items'];
    inputType?: 'TextArea' | 'Input' | 'CodeEditor' | 'InputNumber';
    inputProps?: any;
};

const Component = {
    TextArea: (props: any) => <TextArea {...props} />,
    Input: (props: any) => <Input {...props} />,
    CodeEditor: (props: any) => <CodeEditor {...props} />,
    InputNumber: (props: any) => <InputNumber {...props} />
};

export const InputCompact = ({
    value,
    onChange,
    placeholder,
    defaultValue,
    items = [],
    inputType = 'Input',
    inputProps = {}
}: InputCompactProps) => {
    const [stateValue, setStateValue] = React.useState(value || defaultValue);
    const handleChange = (e: any) => {
        if (inputType === 'CodeEditor' || inputType === 'InputNumber') {
            return onChange?.(e);
        }
        const target = e?.target;
        const value = target?.value;
        onChange?.(value);
    };
    const onClick = (e: any) => {
        const item: any = items.find((item: any) => item.key === e.key);
        if (!!item) {
            let newValue: string = stateValue || '';
            newValue += `${'@'}{${item.label}}`;
            onChange?.(newValue);
        }
    };

    useEffect(() => {
        if (stateValue !== value) {
            setStateValue(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const InputComponent = Component[inputType as keyof typeof Component];

    return (
        <Space.Compact block>
            <InputComponent
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...inputProps}
            />
            {/* {inputType === 'TextArea' ? (
                <TextArea onChange={handleChange} value={value} placeholder={placeholder} defaultValue={defaultValue} />
            ) : (
                <Input onChange={handleChange} value={value} placeholder={placeholder} defaultValue={defaultValue} />
            )} */}
            <Dropdown
                dropdownRender={(menu) => {
                    
                    return <DropDownRender items={items} onClick={onClick} />
                }} 
            placement="bottomRight" trigger={['click']}>
                <Button icon={<span>{'{X}'}</span>} className="flex justify-center items-center  text-white hover:!border-orange-400 hover:!text-white bg-orange-500 hover:!bg-orange-400">
                </Button>
            </Dropdown>
        </Space.Compact>
    );
};
