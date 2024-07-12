import React, { FC } from 'react';
import { Radio, withDynamicSchemaProps } from '@nocobase/client'
import { BlockName } from '../constants';
import { Table } from "antd";
import { useFieldSchema } from '@formily/react';
import { dataAll, fillData, getColumns, LensGridRow } from './LensGridApi';
import { usePluginTranslation } from '../locale';

export interface LensGridProps {
    collectionName: string;
    data?: any[];
    loading?: boolean;
}


//withDynamicSchemaProps 是一个高阶组件，用于处理 Schema 中的的动态属性
export const LensGrid: FC<LensGridProps> = withDynamicSchemaProps(({ data, loading }) => {
    const fieldSchema = useFieldSchema();
    const columns = getColumns();
    const { t } = usePluginTranslation();
    if (data) {
        fillData(data);
    }
    return (
        <div>
            <Table
                dataSource={dataAll}
                columns={columns}
                loading={loading}
                pagination={false}
                title={() => (
                    <Radio.Group>
                        <Radio value="副"></Radio>
                        <Radio value="片">片</Radio>
                    </Radio.Group>
                )}
                bordered
            />
        </div>
    );
}, { displayName: BlockName })


