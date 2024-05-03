import React from 'react';

import { Collapse, CollapseProps, Form } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';

import { InputCompact } from '../input-compact';
import CollapseFormItem from './collapse-item';

interface Props extends CollapseProps {
    globalVariables: {
        key: string;
        value: string;
        label: string;
    }[];
}
const CollapseForm = ({ items, globalVariables, ...otherProps }: Props) => {


    return (
        <>
            <Collapse
             
                items={items?.map((item: any, index: number) => {
                    return {
                        ...item,
                        children: <CollapseFormItem item={item} globalVariables={globalVariables} key={index} />
                    };
                })}
                style={{
                    padding: '0',
                    background: '#fff'
                }}
                size="small"
                {...otherProps}
            />
        </>
    );
};

export default CollapseForm;
