import React from 'react';

import { Form, Radio } from 'antd';
import { isUndefined } from 'lodash';

import { CommandNode } from 'components/common/react-flows/constants/enum';
import { OptionNode, SettingNode } from 'components/common/react-flows/interface';
import { InputCompact } from 'components/ui/elements/items/input-compact';

interface SettingsProps {
    globalVariables: {
        key: string;
        value: string;
        label: string;
    }[];
    commandNode: CommandNode;
}
export const Settings = ({ globalVariables, commandNode }: SettingsProps) => {

    
    return (
        <>
            {
                // [CommandNode.Start, CommandNode.Click].includes(commandNode) &&
                <Form.Item
                    label="Sleep time (millisecond) before run this node (0 to disable)"
                    name={['settings', 'nodeSleep']}
                >
                    <InputCompact items={globalVariables} />
                </Form.Item>
            }
            {
                // [CommandNode.Start, CommandNode.Click].includes(commandNode) &&
                <Form.Item
                    label="Timeout (millisecond) runtime for this node (0 to disable)"
                    name={['settings', 'nodeTimeout']}
                >
                    <InputCompact items={globalVariables} />
                </Form.Item>
            }
            {
                // [CommandNode.Start, CommandNode.Click].includes(commandNode) &&
                <Form.Item name={['settings', 'timeoutNextNode']}>
                    <Radio.Group>
                        <Radio value="successNode">Success Node</Radio>
                        <Radio value="failedNode">Fail Node</Radio>
                    </Radio.Group>
                </Form.Item>
            }
        </>
    );
};
