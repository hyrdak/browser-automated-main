import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input, Space } from 'antd';

import { InputCompact } from 'components/ui/elements/items/input-compact';

interface Props {
    globalVariables: {
        key: string;
        value: string;
        label: string;
    }[];
}

const Variables = ({ globalVariables }: Props) => {
    return (
        <Form.List name="variables" >
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div className="flex items-baseline gap-2" key={key}>
                            <Space.Compact className='flex-1'>
                                <Button icon={<span>{`@{`}</span>} className="flex justify-center items-center text-white hover:!border-orange-400 hover:!text-white bg-orange-500 hover:!bg-orange-400 ">
                                    
                                </Button>
                            <Form.Item
                                {...restField}
                                name={[name, 'key']}
                                rules={[{ required: true, message: 'Missing key variable' }, 
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                  
                                      const allKeys = getFieldValue('variables')?.map((v: any) => v.key);
                                      if (value && allKeys.filter((v: any) => v === value).length > 1) {
                                        return Promise.reject(new Error('Key must be unique'));
                                      }
                                      
                                      return Promise.resolve();
                                    },
                                  }),
                            ]}
                                className="flex-1"
                            >
                                <AutoComplete 
                                    onInputKeyDown={(e) => {
                                        if(e.key === '{' || e.key === '}' || e.key === '@') {
                                            e.preventDefault()
                                        }
                                    }}
                                    placeholder="Key variables" options={globalVariables?.map((item => ({
                                    value:item.label,
                                    label:item.label
                                })))} />
                            </Form.Item>
                            <Button icon={<span className='align-baseline'  >{`}`}</span>} className="flex justify-center items-center  text-white hover:!border-orange-400 hover:!text-white bg-orange-500 hover:!bg-orange-400 "></Button>
                            </Space.Compact>
                            <Form.Item
                                {...restField}
                                name={[name, 'value']}
                                className="flex-1"
                            >
                                <InputCompact placeholder="Value variables" items={globalVariables} />
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
                    ))}
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

export default Variables;
