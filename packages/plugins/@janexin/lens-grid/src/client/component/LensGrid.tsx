import React, { FC } from 'react';
import { withDynamicSchemaProps } from '@nocobase/client'
import { BlockName } from '../constants';

export interface LensGridProps {
    collectionName: string;
    data?: any[];
    loading?: boolean;
}

//withDynamicSchemaProps 是一个高阶组件，用于处理 Schema 中的的动态属性
export const LensGrid: FC<LensGridProps> = withDynamicSchemaProps(({ collectionName, data }) => {
    return <div>
        <div>collection: {collectionName}</div>
        <div>data list: <pre>{JSON.stringify(data, null, 2)}</pre></div>
    </div>
}, { displayName: BlockName })