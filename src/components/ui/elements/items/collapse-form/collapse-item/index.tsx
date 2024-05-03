import React from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, CollapseProps, Form, Input } from 'antd';

import { InputCompact } from '../../input-compact';

interface Props {
    globalVariables: {
        key: string;
        value: string;
        label: string;
    }[];
    item: any;
}

const CollapseFormItem = ({ globalVariables, item }: Props) => {
    
    return (
        <Form.List name={item.name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => {
                        
                        return (
                            <div className="flex items-baseline gap-2" key={key}>
                                <Form.Item
                                    {...restField}
                                    name={[ name, 'key']}
                                    rules={[{ required: true, message: 'Missing key' }]}
                                    className="flex-1"
                                >
                                    <Input placeholder="Enter key" />
                                </Form.Item>
                                <span> = </span>
                                <Form.Item
                                    {...restField}
                                    name={[  name, 'value']}
                                    rules={[{ required: true, message: 'Missing value' }]}
                                    className="flex-1"
                                >
                                    <InputCompact inputProps={{
                                        placeholder:"Enter value"
                                    }} items={globalVariables} />
                                </Form.Item>
    
                                <Button
                                    onClick={() => remove(name)}
                                    shape="circle"
                                    danger
                                    type="text"
                                    icon={<MinusCircleOutlined />}
                                    className="w-6"
                                ></Button>
                            </div>
                        )
                    })}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};

export default CollapseFormItem;
