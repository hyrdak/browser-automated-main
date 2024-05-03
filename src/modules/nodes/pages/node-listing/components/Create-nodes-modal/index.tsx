import { useEffect,useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message,Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

import databaseService from '../../../../../../databaseService';

export default function ModalCreateNode() {
    const [form] = useForm();
    const [open, setOpen] = useState(false);

    const [dataType, setDataType] = useState<Array<any>>([]);
    const [dataKind, setDataKind] = useState<Array<any>>([]);
    const [textAreaValue, setTextAreaValue] = useState<any>();
    const [name, setName] = useState<any>();
    const [type, setType] = useState(0);
    const [kind, setKind] = useState(0);

    useEffect(() => {
        const fetchDataType = async () => {
            setDataType(await databaseService.getType());
        };
        const fetchDataKind = async () => {
            setDataKind(await databaseService.getKind());
        };
        fetchDataType();
        fetchDataKind();
    }, []);

    const handleChangeName = (value: React.ChangeEvent<HTMLInputElement>) => {
        setName(value.target.value);
    }
    const handleChangeType = (value: number) => {
        setType(value);
    }
    const handleChangeKind = (value: number) => {
        setKind(value);
    }
    const handleChangeOptions = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(value.target.value);
    }

    //check json
    function isJSONString(str:any) {
        try {
            JSON.parse(str);
            // eslint-disable-next-line newline-before-return
            return true;
        } catch (error) {
            return false;
        }
    }
    
    const Add_Node = async () => {
        if( name !== '' && textAreaValue !== '' && type !== 0 && kind !==0 ) {
            if(isJSONString(textAreaValue)) {
                if(await databaseService.addNode(name, kind, type, JSON.parse(textAreaValue))) {
                    message.success('Thêm thành công!');
                    window.location.href = '/nodes';
                }else {
                    message.error('Thêm thất bại!');
                }
            }else {
                message.error('Vui lòng nhập đúng định dạng json!');
            }
        }else {
            message.error('Vui lòng nhập đầy đủ thông tin!');
        }
    }

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Create
            </Button>
            <Modal
                open={open}
                afterClose={() => form.resetFields()}
                title={'Create new node instance'}
                destroyOnClose
                onCancel={() => setOpen(false)}
                onOk={() => Add_Node()}
            >
                <Form form={form}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    initialValues={{ node: [{}] }}
                >
                    <Form.List name="node">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        key={field.key}
                                    >
                                        <Form.Item label="Name" name={[field.name, 'name']}>
                                            <Input 
                                                onChange={handleChangeName}
                                                value={name}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Type">
                                            <Select onChange={handleChangeType}>
                                                {
                                                    dataType.map((item) =>
                                                        <Select.Option key={item.id} value={item.id}>{item.name_type}</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Kind">
                                            <Select onChange={handleChangeKind}>
                                                {
                                                    dataKind.map((item) =>
                                                        <Select.Option key={item.id} value={item.id}>{item.name_kind}</Select.Option>
                                                    )
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="JSON Options"
                                            name="TextArea"
                                        >
                                            <Input.TextArea
                                                onChange={handleChangeOptions}
                                                value={textAreaValue}
                                            />
                                        </Form.Item>
                                    </Card>

                                ))}
                            </div>
                        )}
                    </Form.List>

                </Form>
            </Modal>
        </>
    );
};