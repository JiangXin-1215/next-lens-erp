//初始化器
import React from 'react';
import { SchemaInitializerItemType, useSchemaInitializer } from '@nocobase/client'
import { FormOutlined } from '@ant-design/icons';
import { usePluginTranslation } from '../locale';
import { BlockName, BlockNameLowercase } from '../constants';
import { getLensERPFrameFormSchema } from '../schema';


export const lensERPFrameFormInitializerItem: SchemaInitializerItemType = {
    name: BlockNameLowercase,
    Component: 'DataBlockInitializer',
    useComponentProps() {
        const { insert } = useSchemaInitializer();
        const { t } = usePluginTranslation();
        return {
            title: t(BlockName),
            icon: FormOutlined,
            componentType: BlockName,
            useTranslationHooks: usePluginTranslation,
            onCreateBlockSchema({ item }) {
                insert(getLensERPFrameFormSchema({ dataSource: item.dataSource, collection: item.name }))
            },
        };
    },
}