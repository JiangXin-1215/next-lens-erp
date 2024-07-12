// Schema设置
import { SchemaSettings, SchemaSettingsBlockHeightItem, SchemaSettingsBlockTitleItem, setDataLoadingModeSettingsItem, useCollection, useDesignable } from "@nocobase/client";
import { BlockNameLowercase } from "../constants";
import { useTranslation } from 'react-i18next';
import { useFieldSchema } from '@formily/react';

export const gridSettings = new SchemaSettings({
    name: `blockSettings:${BlockNameLowercase}`,
    items: [
        //编辑区块标题
        {
            name: 'editBlockTitle',
            Component: SchemaSettingsBlockTitleItem,
        },
        //设置数据加载模式
        setDataLoadingModeSettingsItem,
        //分割线
        {
            name: 'divider',
            type: 'divider'
        },
        //删除
        {
            type: 'remove',
            name: 'remove',
            componentProps: {
                removeParentsIfNoChildren: true,
                breakRemoveOn: {
                    'x-component': 'Grid',
                },
            }
        }
    ]
})
