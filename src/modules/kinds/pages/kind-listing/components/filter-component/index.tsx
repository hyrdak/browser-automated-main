import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface Props {}

const FilterComponent = (props: Props) => {
    const [form] = useForm();
    const handleFinish = (values: any) => {
        console.log(values);
    };

    return (
        <div>
            <Form form={form} onFinish={handleFinish}>
                <div className="flex justify-end gap-3">
                    <Form.Item className="w-[220px]">
                        <Input placeholder="Enter keyword"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default FilterComponent;
