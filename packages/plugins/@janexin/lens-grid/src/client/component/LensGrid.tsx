import React, { FC } from 'react';
import { useDesignable, withDynamicSchemaProps } from '@nocobase/client'
import { BlockName } from '../constants';
import { Radio, Table } from "antd";
import { useFieldSchema } from '@formily/react';
import { dataAll, fillData, getColumns, changeData } from './LensGridApi';
import { usePluginTranslation } from '../locale';
import type { RadioChangeEvent } from 'antd';

export interface LensGridProps {
    collectionName: string;
    data?: any[];
    loading?: boolean;
}

/*
需求：TODO

UI相关
1第一列加点背景色，类似表格抬头，用于提示用户是不能编辑的
2当页面变小时横向出现滚动轴，滚动时第一列左侧固定，不参与滚动
3增加合计行（重要，优先度较高）
4合计数量字体根据当前主题使用强调色
5限制表格只允许输入数字，当单位为片时不允许输入小数，当单位为副时数字只能是0.5的整数倍（或者变颜色给予醒目提示）

逻辑相关
1组件增加是否可编辑属性，由代码控制是否可编辑    (可编辑时表格抬头和第一列不能编辑)
2改动某一单元格后合计数字和合计行需要对应更改，元数据也需要更改NValue,如果和OValue不相同则将haschanged设置为true
3表格内容区域允许复制和粘贴（或者做个导入导出功能），粘贴时需要将元数据赋值，并且需要满足UI相关第5条限制

可能有点费事
4动态化表格
说明：
表格的横向坐标起始值和结束值可以变化   比如   0.00-2.00   2.25-4.00
表格的纵向坐标起始值和结束值可以变化   比如   2.25-4.00

原因：有数据时展示数据可以一眼就能将数据全部看到
*/

//withDynamicSchemaProps 是一个高阶组件，用于处理 Schema 中的的动态属性
export const LensGrid: FC<LensGridProps> = withDynamicSchemaProps(({ data, loading }) => {
    const fieldSchema = useFieldSchema();
    const columns = getColumns();
    const { patch } = useDesignable();
    const { t } = usePluginTranslation();
    if (data) {
        fillData(data);
    }
    const onChange = (e: RadioChangeEvent) => {
        patch(
            {
                'x-component-props': {
                    unit: e.target.value,
                }
            }
        );
        changeData(e.target.value);
    };
    return (
        <div>
            <Table
                dataSource={dataAll}
                columns={columns}
                loading={loading}
                pagination={false}
                title={() => (
                    <div>
                        <span style={{ marginRight: '10px' }}>{t('UnitType')}</span>
                        <Radio.Group onChange={onChange} value={fieldSchema['x-component-props']?.unit || 0}>
                            <Radio style={{ marginRight: '10px' }} value={1}>{t('Prs')}</Radio>
                            <Radio style={{ marginRight: '10px' }} value={0}>{t('Pcs')}</Radio>
                        </Radio.Group>
                        <span style={{ marginRight: '10px' }}>{t('QtySum')}</span>
                        <span style={{ marginRight: '10px' }}>0</span>
                    </div>
                )}
                bordered
            />
        </div>
    );
}, { displayName: BlockName })


