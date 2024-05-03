import { useMemo } from 'react';
import ReactJson from 'react-json-view';

import { Col, Form, Row } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';

import { getValueOfKey } from 'components/common/react-flows/constants';
import { CommandNode } from 'components/common/react-flows/constants/enum';
import { NodePropsCustom, OptionNode } from 'components/common/react-flows/interface';
import { Elements } from 'components/ui';
import { ElementType } from 'components/ui/elements/constants/enum';
import { ItemElement } from 'components/ui/elements/interfaces';

import { dataCommandModal, getFieldDefaultProps } from '../../../nodes/data';

interface OptionsProps {
    globalVariables: {
        key: string;
        value: string;
        label: string;
    }[];
    commandNode: CommandNode;
    allValues: NodePropsCustom['data']['options'];
}

export const Options = ({ globalVariables = [], commandNode, allValues }: OptionsProps) => {
    const dataField = useMemo(() => {
        if (!commandNode) return [];

        return dataCommandModal[commandNode as CommandNode];
    }, [commandNode]);

    return (
        <Row gutter={[14, 0]} className="w-full">
            {dataField?.map((item: ItemElement) => {
                if (!item.elementType) return null;

                if (
                    !isEmpty(item.conditionShow) &&
                    !item.conditionShow?.condition.includes(
                        allValues?.[item.conditionShow.conditionValue as keyof OptionNode]
                    )
                ) {
                    return null;
                }

                const ElementComponent = Elements[item.elementType];
                const elementProps: any = cloneDeep(item.props);
                if (item.elementType === ElementType.Select && !!item.isUsingVariables) {
                    const newVariables = globalVariables.map((item) => {
                        return { label: getValueOfKey(item.key), value: item.key };
                    });
                    const cloneOptions = elementProps['options'] || [];
                    elementProps['options'] = cloneOptions.concat(newVariables);
                }
                //  else if (ElementType.InputCompact === item.elementType) {
                //     const newVariables = globalVariables.map((item) => {
                //         return { label: getValueOfKey(item.key), key: item.key };
                //     });
                //     const cloneItems = elementProps['items'] || [];
                //     elementProps['items'] = cloneItems.concat(newVariables);
                // } else if (
                //     [ElementType.Input, ElementType.Textarea, ElementType.InputNumber, ElementType.CodeEditor].includes(
                //         item.elementType
                //     )
                // ) {
                //     const newVariables = globalVariables.map((item) => {
                //         return { label: getValueOfKey(item.key), key: item.key };
                //     });
                //     const cloneItems = elementProps['items'] || [];
                //     elementProps['items'] = cloneItems.concat(newVariables);
                // }

                elementProps['globalVariables'] = globalVariables.map((item) => {
                    return { label: getValueOfKey(item.key), key: item.key, value: item.key };
                });
                const defaultField = getFieldDefaultProps(item.elementType);
                
                return (
                    <>
                        <Col {...(item.layout?.col ? item.layout?.col : { span: 24 })}>
                               
                            {
                                                         <Form.Item
                                    label={item.label}
                                    name={   item.elementType === ElementType.Collapse  ?  undefined : ['options', `${item.name as string}`]}
                                    help={item.help}
                                    rules={item.rules}
                                    initialValue={item.props?.[defaultField]}
                                    valuePropName={item.elementType === ElementType.Checkbox ? 'checked' : 'value'}
                                >
                                    <ElementComponent {...elementProps} />
                                </Form.Item>
                            }
                        </Col>
                    </>
                );
            })}
        </Row>
    );
};
