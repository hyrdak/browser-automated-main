import { useEffect, useMemo, useState } from 'react';
import { useNodesState, useReactFlow } from 'reactflow';
import { useAppDispatch } from 'libs/redux';

import { LineChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Tabs } from 'antd';
import { FormInstance, FormProps, useForm, useWatch } from 'antd/es/form/Form';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiStickyNote } from 'react-icons/ci';
import { IoIosOptions } from 'react-icons/io';
import { flatten } from 'lodash';

import { getValueOfKey } from '../../constants';
import { CommandNode, DefaultId, TypeNodes } from '../../constants/enum';
import { IconsBase } from '../../constants/icons';
import { NodePropsCustom, OptionNode, SettingNode } from '../../interface';
import Variables from './components/variables';
import { Note, Options, Settings } from './components';

const TabItems = (
    node: NodePropsCustom,
    allValues: NodePropsCustom['data']['options'],
    variables: {
        key: string;
        value: string;
        label: string;
    }[]
) => [
    {
        key: 'options',
        label: `Options`,
        children: (
            <Options
                commandNode={node?.data?.command || ('' as any)}
                globalVariables={variables}
                allValues={allValues}
            />
        ),
        icon: <IoIosOptions />
    },
    {
        key: 'settings',
        label: `Settings`,
        children: <Settings commandNode={node?.data?.command || ('' as any)} globalVariables={variables} />,
        icon: <SettingOutlined />
    },
    {
        key: 'note',
        label: `Note`,
        children: <Note />,
        icon: <CiStickyNote />
    },
    {
        key: 'setVariants',
        label: `Set Variant`,
        children: <Variables globalVariables={variables} />,
        icon: <IconsBase name="LuVariable" />
    }
    // process.env.NODE_ENV === 'development' && {
    //     key: 'workflowConnections',
    //     label: `Connections`,
    //     children: (
    //         <WorkLine
    //             value={{
    //                 failNode: node.data.failNode || '',
    //                 successNode: node.data.successNode || '',
    //                 loopId: node.data.loopId || '',
    //                 sourceId: node.data.sourceId || ''
    //             }}
    //             nodeId={node.id}
    //         />
    //     ),
    //     icon: <LineChartOutlined />
    // }
];

interface Props {
    open: boolean;
    data: NodePropsCustom | null;
    onClose?: () => void;
    onSave?: (data: NodePropsCustom) => void;
    onDelete?: (id: string) => void;
    onSetVariables?: (variables: object) => void;
    variables?: object;
}

export const ModalNode = ({
    variables,
    open,
    data = {} as NodePropsCustom,
    onClose,
    onSave,
    onDelete,
    onSetVariables
}: Props) => {
    const [form] = useForm();
    const allValues = useWatch(['options'], form);
    const { getNodes } = useReactFlow();

    const handelClose = () => {
        onClose?.();
    };
    const handleRemove = () => {
        if (!data) return;
        onDelete?.(data.id);
        onClose?.();
    };
    const handleSubmit = (values: any) => {
        if (!data) return;
        const { variables, ...rest } = values;

        const convertVariables = variables?.reduce((acc: any, item: any) => {
            acc[`@{${item.key}}`] = item.value || '';

            return acc;
        }, {});

        // if (values?.options?.loopType === 'forEach' || values?.options?.loopType === 'for') {
        //     convertVariables['@{currentItem}'] = '';
        //     convertVariables['@{currentIndex}'] = 0;
        // }

        if (data.id === DefaultId.start) {
            onSetVariables?.(convertVariables);
        }
        onSave?.({
            ...data,
            data: {
                ...data.data,
                ...rest,
                variables: convertVariables
            }
        });
    };

    useEffect(() => {
        if (open && !!data && !!data?.data) {
            form.setFieldsValue({
                ...data?.data,
                variables: Object.entries(data?.data?.variables || {}).map(([key, value]) => ({
                    key: getValueOfKey(key),
                    value
                })),
                settings: {
                    nodeTimeout: '0',
                    nodeSleep: '0',
                    ...(data?.data?.settings || ({} as SettingNode))
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, data?.data, form]);

    const SourceNode = useMemo(() => {
        const nodes = getNodes();

        return nodes?.find((node: any) => {
            return node.id === data?.data?.sourceId;
        });
    }, [data?.data?.sourceId, getNodes]);

    const globalVariablesMemo = useMemo(() => {
        if (!variables) return [];
        // const tempVariables = variables;
        // if(SourceNode?.type === CommandNode.Loop && SourceNode.data?.loopId ===data?.data?.id ){

        // }

        return Object.entries(variables).map(([key, value]) => {
            return { label: getValueOfKey(key), value, key };
        });
    }, [variables]);

    return (
        <Modal
            open={open}
            afterClose={() => form.resetFields()}
            title={
                <div>
                    <IconsBase name={data?.data?.icon} />
                    <span className="ml-3">{data?.label}</span>
                </div>
            }
            destroyOnClose
            width={600}
            style={{ top: 20 }}
            footer={[
                <Button key="back" onClick={handelClose}>
                    Close
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Save
                </Button>
            ]}
            closeIcon={
                <>
                    {' '}
                    <AiOutlineDelete
                        className="text-xl text-red-400"
                        onClick={handleRemove}
                        display={data?.data?.command === CommandNode.Start ? 'none' : 'block'}
                    />
                </>
            }
        >
            {open && data && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="w-full overflow-auto max-h-[80vh]"
                >
                    <Tabs
                        defaultActiveKey="1"
                        items={
                            data?.data?.command === CommandNode.Stop
                                ? TabItems(data, allValues, globalVariablesMemo).filter(
                                      (item) => item.key !== 'setVariants'
                                  )
                                : TabItems(data, allValues, globalVariablesMemo)
                        }
                    ></Tabs>
                </Form>
            )}
            {/* <Form form={form} onFinish={handleSubmit} layout="vertical"></Form> */}
        </Modal>
    );
};
