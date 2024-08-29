//初始化器
import React from 'react';
import { SchemaInitializerItemType, useSchemaInitializer } from '@nocobase/client'
import { TableOutlined } from '@ant-design/icons';

import { lensGridEditSchema } from '../schema'
import { usePluginTranslation } from '../locale';
import { BlockName, BlockNameLowercase } from '../constants';

export const gridEditInitializerItem: SchemaInitializerItemType = {
  type: 'item',
  name: BlockNameLowercase,
  useComponentProps() {
    const { insert } = useSchemaInitializer();
    const { t } = usePluginTranslation();

    return {
      title: t(BlockName),
      icon: <TableOutlined />,
      componentType: BlockName,
      useTranslationHooks: usePluginTranslation,
      onClick: () => {
        insert(lensGridEditSchema);
      },
    };
  },
}
