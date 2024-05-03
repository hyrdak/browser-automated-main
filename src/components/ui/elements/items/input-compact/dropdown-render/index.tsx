import * as React from 'react';

import { Empty, Input } from 'antd';
import { isEmpty } from 'lodash';

interface DropDownRenderProps {
    items:any
    onClick:(item:any)=>void
}

const DropDownRender: React.FunctionComponent<DropDownRenderProps> = ({items , onClick}) => {
    const [search , setSearch] = React.useState('')
    
    const itemDisplay = !isEmpty(search) ? items.filter((item:any) => item?.label?.toLowerCase().includes(search?.toLowerCase())) : items
    const handleSearch =  (e:any) => {
            const value =  e.target.value;
            setSearch(value)
    }

    return <div className='w-full bg-white rounded-sm shadow-lg' >
        <Input className='w-full' onChange={handleSearch} placeholder='Enter key variables'
            allowClear={true}
        />
        <div className='mt-2 rounded-sm'> 
            { !isEmpty(items) ?
                itemDisplay.map((item:any) => {
                    if(item.label.toLowerCase().includes(search.toLowerCase())){
                        return <div className='py-2 px-3 hover:cursor-pointer hover:bg-stone-100 rounded-sm' key={item.key} onClick={()=>onClick(item)}>{item.label}</div>
                    }
                }) : <div  className='flex justify-center items-center w-full h-20 rounded-sm text-red-500 font-bold' > No variables </div>
            }
        </div>
    </div>
};

export default DropDownRender;
