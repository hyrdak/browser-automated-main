import { useMemo, useState } from 'react';
import { matchSorter } from 'match-sorter';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Divider, Tooltip, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { BsPin, BsPinAngle, BsPinAngleFill, BsPinFill } from 'react-icons/bs';
import { LuPin } from 'react-icons/lu';
import clsx from 'clsx';

import { getListCommandNode } from '../../constants';
import { COMMAND_NODE_ICONS, COMMAND_NODE_LABELS, CommandNode, KindNode } from '../../constants/enum';
import { IconsBase } from '../../constants/icons';

type DataMenu = {
    key: string;
    label: string;
    listCommandNode: CommandNode[];
    children: (props: ContentProps) => JSX.Element;
};
export const contentCollapse = ({ onDragStart, listCommandNode, isCollapse }: any) => {
    return (
        <div className="flex flex-col w-full gap-2 ">
            {listCommandNode.map((commandNode: CommandNode) => {
                return (
                    <Tooltip title={COMMAND_NODE_LABELS[commandNode]}>
                        <Button
                            type="dashed"
                            block
                            title={COMMAND_NODE_LABELS[commandNode]}
                            key={commandNode}
                            size="large"
                            onDragStart={(event: any) => onDragStart(event, commandNode)}
                            draggable
                            className="w-full "
                            icon={<IconsBase name={COMMAND_NODE_ICONS[commandNode]} size={16}  />}
                            style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                        >
                            
                            {!isCollapse && COMMAND_NODE_LABELS[commandNode]}
                        
                                {/* <div className={
                                    clsx("flex items-center justify-center gap-2 sm:justify-start", {
                                    ['!w-[80px]']: isCollapse
                                    })
                                }>
                                    <span className="inline-flex ">
                                        
                                    </span>
                                    { !isCollapse &&
                                    <span className="hidden truncate md:block ">{COMMAND_NODE_LABELS[commandNode]}</span>
                                    }
                                </div> */}
                        </Button>
                        </Tooltip>
                );
            })}
            {/* {kind === 'other' && (
                <Button type="dashed" key={'custom'} onDragStart={(event) => onDragStart(event, 'custom')} draggable>
                    Custom
                </Button>
            )} */}
        </div>
    );
};
type ContentProps = {
    onDragStart: any;
    listCommandNode: CommandNode[];
    isCollapse: boolean;

};
const dataCollapse: DataMenu[] = Object.entries(KindNode).map(([key, value]) => {
    return {
        key,
        label: key,
        listCommandNode: getListCommandNode(value),
        children: (props: ContentProps) => contentCollapse({ ...props })
    };
});

export const LeftSidebar = ({ nodes, edges }: any) => {
    const [searchValue, setSearchValue] = useState('');
    const [collapse , setCollapse] = useState(false); 
    const onDragStart = (event: any, data: CommandNode) => {
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
    };
    const handleChangeSearch = (e: any) => {
        setSearchValue(e.target.value);
    };
    const dataFilter: DataMenu[] = useMemo(() => {
        if (!searchValue) {
            return dataCollapse;
        }
        const itemMatch = dataCollapse?.map((item) => {
            const searchList = [...item.listCommandNode]?.map((commandNode) => {
                return { label: COMMAND_NODE_LABELS[commandNode], value: commandNode };
            });
            const newList = matchSorter(searchList, searchValue, { keys: ['label'] });

            return {
                ...item,
                listCommandNode: newList?.map((item) => item.value)
            };
        });

        return itemMatch?.filter((item: DataMenu) => item.listCommandNode.length > 0);
    }, [searchValue]);

    return (
        <aside className="relative rounded-s left-sidebar">
           
            <div className={
                clsx(
                    "md:w-auto  h-full overflow-y-auto transition-all ease-in-out bg-white border w-[160px] mask-image-scroll",
                    {
                        ['!w-[80px]']: collapse
                    }
                )
            }>
              {/* <Divider className="!my-0 border-[#f1f1f1]  -top-[16px]" orientation="right"> */}
                    <span
                        onClick={() => setCollapse(!collapse)}
                        className={
                            clsx(" hover:cursor-pointer top-[1px] right-[18px] hover:rounded-full absolute z-[11]" , {
                                ['-translate-x-1/4 !right-1/2 !top-2']: collapse
                            
                            })
                        }
                    >
                        {collapse ? <BsPinAngle  /> : <BsPinAngleFill   />}
                    </span>
                {/* </Divider> */}
                <div className="sticky top-0 px-2 py-4 bg-white z-[1] shadow-sm">
                {
                    !collapse &&  
                    <Search onChange={handleChangeSearch} placeholder="Search keyword" />
                }
                </div>
                <Collapse
                    style={{
                        padding: '0',
                        background: '#fff'
                    }}
                    expandIconPosition='end'
                    defaultActiveKey={dataFilter?.map((item) => item.key) || []}
                    size="small"
                    bordered={false}
                    items={dataFilter?.map((item: DataMenu) => {
                        const { listCommandNode } = item;

                        return {
                            key: item.key,
                            label: (
                                <Typography.Text
                                    title= {item.label}
                                    strong
                                    onClick={(e: any) => e.stopPropagation()}
                                    className='flex'
                                >
                                    {collapse ? item.label.substring(0,3) +'...'  : item.label}
                                </Typography.Text>
                            ),
                            children: item.children({ onDragStart, listCommandNode , isCollapse: collapse}),
                            showArrow: !collapse
                        };
                    })}
                ></Collapse>
            </div>
        </aside>
    );
};
