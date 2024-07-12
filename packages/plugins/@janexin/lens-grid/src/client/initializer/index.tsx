//初始化器
import React from 'react';
import { SchemaInitializer, SchemaInitializerItemType, useSchemaInitializer } from '@nocobase/client'
import { TableOutlined } from '@ant-design/icons';

import { getGridSchema } from '../schema'
import { usePluginTranslation } from '../locale';
import { BlockName, BlockNameLowercase } from '../constants';

export const gridInitializer: SchemaInitializerItemType = {
    name: BlockNameLowercase,
    Component: 'DataBlockInitializer',
    useComponentProps() {
        const { insert } = useSchemaInitializer();
        const { t } = usePluginTranslation();
        return {
            title: t(BlockName),
            icon: <TableOutlined />,
            componentType: BlockName,
            useTranslationHooks: usePluginTranslation,
            onCreateBlockSchema({ item }) {
                insert(getGridSchema({ dataSource: item.dataSource, collection: item.name }))
            },
        };
    },
}

