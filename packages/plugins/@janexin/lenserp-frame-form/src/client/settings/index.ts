import { SchemaSettings, SchemaSettingsBlockTitleItem } from "@nocobase/client";
import { BlockNameLowercase } from "../constants";

export const lensERPFrameFormSettings = new SchemaSettings({
    name: `blockSettings:${BlockNameLowercase}`,
    items: [
        //编辑区块标题
        {
            name: 'editBlockTitle',
            Component: SchemaSettingsBlockTitleItem,
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