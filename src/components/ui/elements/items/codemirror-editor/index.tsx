import React, { useEffect } from 'react';

import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { Card } from 'antd';

const CodeEditor = ({ onChange, value }: any) => {
    const [stateValue, setValue] = React.useState("console.log('hello world!');");
    const handleChange = React.useCallback(
        (val: any, viewUpdate: any) => {
        
            onChange?.(val);
            setValue(val);
        },
        [onChange]
    );

    useEffect(() => {
        if (value !== stateValue) {
            setValue(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <CodeMirror
            value={stateValue}
            height="200px"
            theme="dark"
            extensions={[javascript({ jsx: true })]}
            onChange={handleChange}
        />
    );
};

export default CodeEditor;
