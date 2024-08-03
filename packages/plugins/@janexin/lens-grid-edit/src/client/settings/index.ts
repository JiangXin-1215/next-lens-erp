// Schema设置
import { SchemaSettings, SchemaSettingsBlockHeightItem, SchemaSettingsBlockTitleItem } from "@nocobase/client";
import { BlockNameLowercase } from "../constants";

export const gridEditSettings = new SchemaSettings({
    name: `blockSettings:${BlockNameLowercase}`,
    items: [
        //编辑区块标题
        {
            name: 'editBlockTitle',
            Component: SchemaSettingsBlockTitleItem,
        },
        //编辑区块高度
        {
            name: 'editBlockHeight',
            Component: SchemaSettingsBlockHeightItem,
        },
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
