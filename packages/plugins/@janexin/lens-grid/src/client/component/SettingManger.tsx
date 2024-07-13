import React, { FC, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

import { ISchema } from "@nocobase/client";

// export const SettingManeger: ISchema = {
//     type: 'void',
//     name: 'LensGirdSettingManeger',
//     title: '{{t("LensGrid Settings")}}',
//     ['x-decorator']: 'CardItem',
//     properties: {
//         unit:{
//             type:
//         }
//     }
// }

export const SettingManeger: FC = () => {
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={0}>Pcs</Radio>
                <Radio value={1}>Prs</Radio>
            </Radio.Group>
        </div>

    )
}