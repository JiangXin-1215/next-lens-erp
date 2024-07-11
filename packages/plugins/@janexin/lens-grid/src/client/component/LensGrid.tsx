import React, { FC } from 'react';
import { withDynamicSchemaProps } from '@nocobase/client'
import { BlockName } from '../constants';
import { Table } from "antd";
import { useFieldSchema } from '@formily/react';
import { dataAll, fillData, getColumns } from './LensGridApi';

export interface LensGridProps {
    collectionName: string;
    data?: any[];
    loading?: boolean;
}

//withDynamicSchemaProps 是一个高阶组件，用于处理 Schema 中的的动态属性
export const LensGrid: FC<LensGridProps> = withDynamicSchemaProps(({ data }) => {
    const fieldSchema = useFieldSchema();
    const XField = fieldSchema['x-use-component-props']?.XField || 'iCyl';
    const columns = getColumns(XField);
    fillData(data);
    return (
        <div>
            <Table
                dataSource={dataAll}
                columns={columns}
                // loading={loading}
                pagination={false}
                bordered
            />
        </div>
    );
}, { displayName: BlockName })