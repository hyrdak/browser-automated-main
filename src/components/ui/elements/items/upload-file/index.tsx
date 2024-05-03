import React, { useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';

const UploadFileComponent = (props: any) => {
 

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const reader = new FileReader();

            reader.onload = function () {
                const imageURL = reader.result;
            };

            reader.readAsDataURL(file);
        }

        // if (!src) {
        //     src = await new Promise((resolve) => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file.originFileObj as any);
        //         reader.onload = () => resolve(reader.result as string);
        //     });
        // }
        // const image = new Image();
        // image.src = src;
        // const imgWindow = window.open(src);
        // imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div>
            <label>
                {<UploadOutlined />}
                <input type="file" onChange={onChange}></input>
            </label>
        </div>
    );
};

export default UploadFileComponent;
