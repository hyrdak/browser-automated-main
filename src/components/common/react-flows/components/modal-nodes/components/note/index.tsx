import React from 'react';

import { Form, Input } from 'antd';

export const Note = () => {
    return (
        <Form.Item name={['description']}>
            <Input.TextArea rows={3} />
        </Form.Item>
    );
};
