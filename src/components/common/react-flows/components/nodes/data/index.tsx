import { isEmpty, isUndefined } from 'lodash';

import { CommandNode } from 'components/common/react-flows/constants/enum';
import { CommandModalProps } from 'components/common/react-flows/interface';
import { ElementType } from 'components/ui/elements/constants/enum';
import { ItemElement } from 'components/ui/elements/interfaces';

import { dataKeyboard } from './data-presskey';

export const dataCommandModal: Partial<CommandModalProps> = {
    [CommandNode.Start]: [
        {
            label: 'Emulate human-like mouse',
            name: 'emulateMouse',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Enable',
                defaultChecked: false
            }
        },
        {
            label: 'Emulate human-like keyboard',
            name: 'emulateKeyboard',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Enable',
                defaultChecked: false
            }
        }
    ],
    [CommandNode.Stop]: [
        {
            label: 'Capture HTML',
            name: 'captureHtml',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Enable',
                defaultChecked: false
            }
        },
        {
            label: 'Capture Image',
            name: 'captureImage',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Enable',
                defaultChecked: false
            }
        },
        {
            label: 'Close All Tabs',
            name: 'closeAllTabs',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Enable',
                defaultChecked: false
            }
        }
    ],
    [CommandNode.Scroll]: [
        {
            label: 'Scroll type',
            name: 'selectType',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'xPath',
                        label: 'XPath'
                    },
                    {
                        value: 'css',
                        label: 'Css'
                    },
                    {
                        value: 'text',
                        label: 'Text'
                    },
                    {
                        value: 'coordinates',
                        label: 'Coordinates'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Selector',
            name: 'selectorData',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter selector of element'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Timeout (millisecond)',
            name: 'timeout',
            elementType: ElementType.InputCompact,
            props: {
                defaultValue: '10'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Speed',
            name: 'speed',
            elementType: ElementType.InputCompact,
            props: {
                defaultValue: '1'
            },
            conditionShow: {
                condition: ['coordinates'],
                conditionValue: 'selectType'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: 'Direction',
            name: 'isDown',
            elementType: ElementType.Switch,
            props: {
                defaultChecked: true,
                checkedChildren: 'Down',
                unCheckedChildren: 'Up'
            },
            conditionShow: {
                condition: ['coordinates'],
                conditionValue: 'selectType'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: 'X coordinate',
            name: 'x',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'X coordinate'
            },
            conditionShow: {
                condition: ['coordinates'],
                conditionValue: 'selectType'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: 'Y coordinate',
            name: 'y',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Y coordinate'
            },
            conditionShow: {
                condition: ['coordinates'],
                conditionValue: 'selectType'
            },

            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: '',
            name: 'isRandom',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Random',
                defaultChecked: false
            }
        }
    ],
    [CommandNode.Click]: [
        {
            label: 'Button',
            name: 'button',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'left',
                        label: 'Left'
                    },
                    {
                        value: 'right',
                        label: 'Right'
                    },
                    {
                        value: 'middle',
                        label: 'Middle'
                    }
                ],
                defaultValue: 'left'
            }
        },
        {
            label: 'Select Type',
            name: 'selectType',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'xPath',
                        label: 'XPath'
                    },
                    {
                        value: 'css',
                        label: 'Css'
                    },
                    {
                        value: 'text',
                        label: 'Text'
                    },
                    {
                        value: 'coordinates',
                        label: 'Coordinates'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Selector',
            name: 'selectorData',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter selector of element'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Click count',
            name: 'clickCount',
            elementType: ElementType.InputCompact,
            props: {
                defaultValue: '1'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Timeout (millisecond)',
            name: 'timeout',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Default 1000 millisecond',
                defaultValue: '1000'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'X coordinate',
            name: 'x',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'X coordinate'
            },
            conditionShow: {
                condition: ['coordinates'],
                conditionValue: 'selectType'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: 'Y coordinate',
            name: 'y',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Y coordinate'
            },
            conditionShow: {
                condition: ['coordinates'],
                conditionValue: 'selectType'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: '',
            name: 'isRandom',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Random',
                defaultChecked: false
            }
        }
    ],
    [CommandNode.OpenUrl]: [
        {
            label: 'Url',
            name: 'url',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'https://canawan.com',
                defaultValue: ''
            }
        }
    ],
    [CommandNode.Random]: [
        {
            label: 'Type',
            name: 'type',
            elementType: ElementType.Select,
            props: {
                options: [
                    {
                        value: 'number',
                        label: 'Number'
                    },
                    {
                        value: 'string',
                        label: 'String'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Output variable',
            name: 'outputVariable',
            elementType: ElementType.InputCompact,

            props: {}
        },
        {
            label: 'From number (millisecond)',
            name: 'minNumber',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Default 1000 millisecond',
                defaultValue: '1000'
            },
            layout: {
                col: { span: 12 }
            },
            conditionShow: {
                condition: 'number',
                conditionValue: 'type'
            }
        },
        {
            label: 'To number (millisecond)',
            name: 'maxNumber',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Default 1000 millisecond',
                defaultValue: '1000'
            },
            layout: {
                col: { span: 12 }
            },
            conditionShow: {
                condition: 'number',
                conditionValue: 'type'
            }
        }
    ],
    [CommandNode.MouseMovement]: [
        {
            label: 'X coordinate',
            name: 'x',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'X coordinate'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: 'Y coordinate',
            name: 'y',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Y coordinate'
            },
            layout: {
                col: {
                    span: 12
                }
            }
        },
        {
            label: '',
            name: 'isRandom',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Random',
                defaultChecked: false
            }
        }
    ],
    [CommandNode.If]: [
        {
            label: 'Left operand',
            name: 'dataLeft',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter or choose left operand'
            }
        },
        {
            label: 'Operator',
            name: 'operator',
            elementType: ElementType.Select,
            props: {
                options: [
                    {
                        value: '==',
                        label: '=='
                    },
                    {
                        value: '!=',
                        label: '!='
                    },
                    {
                        value: '>',
                        label: '>'
                    },
                    {
                        value: '>=',
                        label: '>='
                    },
                    {
                        value: '<',
                        label: '<'
                    },

                    {
                        value: '<=',
                        label: '<='
                    },
                    {
                        value: 'contains',
                        label: 'Contains'
                    },
                    {
                        value: '!contains',
                        label: 'Not contains'
                    },
                    {
                        value: 'isEmptyOrNull',
                        label: 'Is empty or null'
                    },
                    {
                        value: '!isEmptyOrNull',
                        label: 'Is not empty or null'
                    },
                    {
                        value: 'startWith',
                        label: 'Start with'
                    },
                    {
                        value: '!startWith',
                        label: 'Not start with'
                    },
                    {
                        value: 'endWith',
                        label: 'End with'
                    },
                    {
                        value: '!endWith',
                        label: 'Not end with'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Select right operand',
            name: 'dataRight',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter or choose right operand'
            }
        }
    ],
    [CommandNode.Sleep]: [
        {
            label: 'From number (millisecond)',
            name: 'minNumber',
            elementType: ElementType.InputCompact,
            props: {
                defaultValue: '0'
            },
            layout: {
                col: { span: 12 }
            }
        },
        {
            label: 'To number (millisecond)',
            name: 'maxNumber',
            elementType: ElementType.InputCompact,
            props: {
                defaultValue: '0'
            },
            layout: {
                col: { span: 12 }
            }
        }
    ],
    [CommandNode.UploadFile]: [
        {
            label: 'Select Type',
            name: 'selectType',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'xPath',
                        label: 'XPath'
                    },
                    {
                        value: 'css',
                        label: 'Css'
                    },
                    {
                        value: 'text',
                        label: 'Text'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Selector',
            name: 'selectorData',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter selector of element'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'File path',
            name: 'fileUrl',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter file path',
                defaultValue: ''
            }
        },
        {
            label: '',
            name: 'clickToUpload',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Click to upload',
                defaultChecked: false
            }
        }
    ],
    [CommandNode.ElementExists]: [
        {
            label: 'Select Type',
            name: 'selectType',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'xPath',
                        label: 'XPath'
                    },
                    {
                        value: 'css',
                        label: 'Css'
                    },
                    {
                        value: 'text',
                        label: 'Text'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Selector',
            name: 'selectorData',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter selector of element',
                defaultValue: null
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Timeout (millisecond)',
            name: 'timeout',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Default 1000 millisecond',
                defaultValue: '1000'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        }
    ],
    [CommandNode.TypeText]: [
        {
            label: 'Select Type',
            name: 'selectType',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'xPath',
                        label: 'XPath'
                    },
                    {
                        value: 'css',
                        label: 'Css'
                    },
                    {
                        value: 'text',
                        label: 'Text'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Selector',
            name: 'selectorData',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter selector of element'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Timeout (millisecond)',
            name: 'timeout',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Default 1000 millisecond',
                defaultValue: '1000'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Text',
            name: 'text',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter text'
            }
        }
    ],
    [CommandNode.PressKey]: [
        {
            label: 'Select Type',
            name: 'selectType',
            elementType: ElementType.RadioGroup,
            props: {
                options: [
                    {
                        value: 'xPath',
                        label: 'XPath'
                    },
                    {
                        value: 'css',
                        label: 'Css'
                    },
                    {
                        value: 'text',
                        label: 'Text'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'Selector',
            name: 'selectorData',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter selector of element'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Timeout (millisecond)',
            name: 'timeout',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Default 1000 seconds',
                defaultValue: '1000'
            },
            conditionShow: {
                condition: ['xPath', 'css', 'text'],
                conditionValue: 'selectType'
            }
        },
        {
            label: 'Keys',
            name: 'keys',
            elementType: ElementType.Select,
            props: {
                mode: 'tags',
                placeholder: 'Enter keys',
                options: dataKeyboard
            }
        }
    ],
    [CommandNode.Loop]: [
        {
            label: 'Type',
            name: 'loopType',
            elementType: ElementType.Select,
            props: {
                placeholder: 'Choose loop type',
                options: [
                    {
                        label: 'For',
                        value: 'for'
                    },
                    {
                        label: 'While',
                        value: 'while'
                    },
                    {
                        label: 'Do While',
                        value: 'doWhile'
                    },
                    {
                        label: 'ForEach',
                        value: 'forEach'
                    }
                ],
                defaultValue: null
            }
        },
        {
            label: 'For from value',
            name: 'fromNumber',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter from value',
                defaultValue: '0'
            },
            conditionShow: {
                condition: ['for'],
                conditionValue: 'loopType'
            },
            layout: {
                col: { span: 12 }
            }
        },
        {
            label: 'To from value',
            name: 'toNumber',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter from value',
                defaultValue: '0'
            },
            conditionShow: {
                condition: ['for'],
                conditionValue: 'loopType'
            },
            layout: {
                col: { span: 12 }
            }
        },
        {
            label: 'Data left',
            name: 'dataLeft',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter data',
                defaultValue: null
            },
            conditionShow: {
                condition: ['while', 'doWhile'],
                conditionValue: 'loopType'
            },
            layout: {
                col: { span: 8 }
            }
        },
        {
            label: 'Operator',
            name: 'operator',
            elementType: ElementType.Select,
            props: {
                placeholder: 'Select operator',
                options: [
                    {
                        value: '==',
                        label: '=='
                    },
                    {
                        value: '!=',
                        label: '!='
                    },
                    {
                        value: '>',
                        label: '>'
                    },
                    {
                        value: '>=',
                        label: '>='
                    },
                    {
                        value: '<',
                        label: '<'
                    },

                    {
                        value: '<=',
                        label: '<='
                    },
                    {
                        value: 'contains',
                        label: 'Contains'
                    },
                    {
                        value: '!contains',
                        label: 'Not contains'
                    },
                    {
                        value: 'isEmptyOrNull',
                        label: 'Is empty or null'
                    },
                    {
                        value: '!isEmptyOrNull',
                        label: 'Is not empty or null'
                    },
                    {
                        value: 'startWith',
                        label: 'Start with'
                    },
                    {
                        value: '!startWith',
                        label: 'Not start with'
                    },
                    {
                        value: 'endWith',
                        label: 'End with'
                    },
                    {
                        value: '!endWith',
                        label: 'Not end with'
                    }
                ],
                defaultValue: null
            },
            conditionShow: {
                condition: ['while', 'doWhile'],
                conditionValue: 'loopType'
            },
            layout: {
                col: { span: 8 }
            }
        },
        {
            label: 'Data right',
            name: 'dataRight',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter data',
                defaultValue: null
            },
            conditionShow: {
                condition: ['while', 'doWhile'],
                conditionValue: 'loopType'
            },
            layout: {
                col: { span: 8 }
            }
        },
        {
            label: 'Data',
            name: 'item',
            elementType: ElementType.InputCompact,
            conditionShow: {
                condition: ['forEach'],
                conditionValue: 'loopType'
            },
            props: {
                placeholder: 'Enter output variable',
                defaultValue: ''
            }
        }
    ],
    [CommandNode.Javascript]: [
        {
            label: '',
            name: 'isHaveOutput',
            elementType: ElementType.Checkbox,
            props: {
                children: 'Have output',
                defaultChecked: false
            }
        },
        {
            label: '',
            name: 'outputVariable',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Enter output variable',
                defaultValue: ''
            }
        },
        {
            label: 'Javascript code',
            name: 'javascriptCode',
            elementType: ElementType.CodeEditor,
            props: {
                placeholder: 'Enter javascript code',
                defaultValue: ''
            }
        }
    ],
    [CommandNode.Fetch]: [
        {
            label: 'Url',
            name: 'url',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'https://canawan.com',
                defaultValue: ''
            }
        },
        {
            label: 'Method',
            name: 'method',
            elementType: ElementType.RadioGroup,
            props: {
                defaultValue: 'GET',
                options: [
                    {
                        value: 'GET',
                        label: 'GET'
                    },
                    {
                        value: 'POST',
                        label: 'POST'
                    },
                    {
                        value: 'PUT',
                        label: 'PUT'
                    }
                    // {
                    //     value: 'DELETE',
                    //     label: 'DELETE'
                    // }
                ]
            }
        },
        {
            label: '',
            name: 'headers',
            elementType: ElementType.Collapse,
            props: {
                placeholder: 'Enter headers',
                items: [
                    {
                        label: 'Headers',
                        name: ['options', 'headers']
                    }
                ]
            }
        },
        {
            label: '',
            name: 'cookies',
            elementType: ElementType.Collapse,
            props: {
                placeholder: 'Enter headers',
                items: [
                    {
                        label: 'Cookies',
                        name: ['options', 'cookies']
                    }
                ]
            }
        },
        {
            label: '',
            name: 'params',
            elementType: ElementType.Collapse,
            props: {
                placeholder: 'Enter headers',
                items: [
                    {
                        label: 'Params',
                        name: ['options', 'params']
                    }
                ]
            }
        },
        {
            label: 'Content type',
            name: 'contentType',
            elementType: ElementType.Select,
            props: {
                options: [
                    {
                        value: 'application/json',
                        label: 'application/json'
                    },
                    {
                        value: 'application/x-www-form-urlencoded',
                        label: 'application/x-www-form-urlencoded'
                    },
                    {
                        value: 'multipart/form-data',
                        label: 'multipart/form-data'
                    }
                ]
            },
            conditionShow: {
                condition: ['POST', 'PUT'],
                conditionValue: 'method'
            }
        },
        {
            label: 'Body',
            name: 'body',
            elementType: ElementType.Textarea,
            props: {
                placeholder: 'Enter body'
            },
            conditionShow: {
                condition: ['application/json'],
                conditionValue: 'contentType'
            }
        },
        {
            label: '',
            name: '',
            elementType: ElementType.Collapse,
            props: {
                placeholder: 'Enter headers',
                items: [
                    {
                        label: 'Form Data',
                        name: 'formData'
                    }
                ]
            },
            conditionShow: {
                condition: ['application/x-www-form-urlencoded', 'multipart/form-data'],
                conditionValue: 'contentType'
            }
        },
        {
            label: 'Output Url',
            name: 'outputUrl',
            elementType: ElementType.InputCompact,
            props: {
                inputProps: {
                    placeholder: 'Enter output url'
                }
            }
        },
        {
            label: 'Output Header',
            name: 'outputHeaders',
            elementType: ElementType.InputCompact,
            props: {
                inputProps: {
                    placeholder: 'Enter output header'
                }
            }
        },
        {
            label: 'Output Body',
            name: 'outputBody',
            elementType: ElementType.InputCompact,
            props: {
                inputProps: {
                    placeholder: 'Enter output body'
                }
            }
        }
    ],
    [CommandNode.GetUrl]: [
        {
            label: 'Output variable',
            name: 'outputVariable',
            elementType: ElementType.InputCompact,
            isUsingVariables: true,
            props: {}
        }
    ],
    [CommandNode.SetVariables]: [
        {
            label: 'Select variable',
            name: 'selectVariables',
            elementType: ElementType.Select,
            isUsingVariables: true,
            props: {
                options: [],
                placeholder: 'Select variable'
            }
        },
        {
            label: 'Operator',
            name: 'operator',
            elementType: ElementType.Select,
            props: {
                placeholder: 'Select operator',
                options: [
                    {
                        label: '=',
                        value: '='
                    },
                    {
                        label: '+',
                        value: '+'
                    },
                    {
                        label: '-',
                        value: '-'
                    },
                    {
                        label: '*',
                        value: '*'
                    },
                    {
                        label: '/',
                        value: '/'
                    },
                    {
                        label: 'Concatenate',
                        value: 'concatenate'
                    }
                ]
            }
        },
        {
            label: 'Variables Value',
            name: 'variablesValue',
            elementType: ElementType.InputCompact,
            props: {
                placeholder: 'Select operator'
            }
        }
    ],
    [CommandNode.Custom]: [
        {
            label: 'Custom Data',
            name: 'data',
            elementType: ElementType.Textarea,
            props: {
                placeholder: 'Enter data type JSON',
                rows: 5,
                defaultValue: ''
            },
            rules: [
                {
                    validator: (_: any, value: string) => {
                        try {
                            JSON.parse(value);

                            return Promise.resolve();
                        } catch (err) {
                            return Promise.reject(new Error('Invalid JSON'));
                        }
                    }
                }
            ]
        }
    ]
};

export const getInitOptions = (commandNode: CommandNode) => {
    const dataOptions = dataCommandModal[commandNode];
    const defaultValueOptions: any = {};
    dataOptions?.forEach((item: ItemElement) => {
        const defaultField = getFieldDefaultProps(item.elementType as ElementType);
        if (!isEmpty(item.conditionShow)) {
            const valueCondition = dataOptions.find(
                (item2: ItemElement) => item.conditionShow?.conditionValue === item2.name
            )?.props?.defaultValue;
            const isShow = item.conditionShow?.condition?.includes(valueCondition);
            if (!isShow) {
                return;
            }
        }
        if (!isUndefined(item.props?.[defaultField])) {
            defaultValueOptions[item.name as string] = item.props?.[defaultField];
        }
    });

    return defaultValueOptions;
};

export const getFieldDefaultProps = (typeElement: ElementType): string => {
    switch (typeElement) {
        case ElementType.Switch:
        case ElementType.Checkbox:
            return 'defaultChecked';
        default:
            return 'defaultValue';
    }
};
