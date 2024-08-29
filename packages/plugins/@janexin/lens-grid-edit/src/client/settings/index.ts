// Schema设置
import { SchemaSettings, SchemaSettingsBlockTitleItem, useDesignable } from "@nocobase/client";
import { BlockNameLowercase } from "../constants";
import { useField } from '@formily/react';
import { usePluginTranslation } from "../locale";

export const gridEditSettings = new SchemaSettings({
    name: `blockSettings:${BlockNameLowercase}`,
    items: [
        //编辑区块标题
        {
            name: 'editBlockTitle',
            Component: SchemaSettingsBlockTitleItem,
        },
        //只读
        {
            name: 'readOnly',
            type: 'switch',
            useComponentProps() {
                const { patch } = useDesignable();
                const filed = useField();
                const { t } = usePluginTranslation();
                return {
                    title: t('ReadOnly'),
                    checked: filed.componentProps?.readOnly || false,
                    onChange(v) {
                        patch({
                            'x-component-props': {
                                readOnly: v,
                            },
                        });
                    },
                }
            }
        },
        //分割线
        {
            name: 'divider',
            type: 'divider'
        },
        //数据源
        // {
        //     name: 'collectionName',
        //     type: 'select',
        //     useComponentProps() {
        //         const { patch } = useDesignable();
        //         const filed = useField();
        //         const { t } = usePluginTranslation();
        //         const collectionManager = useCollectionManager();
        //         const collections = collectionManager.getCollections();
        //         //过滤出字段中含有SPH的
        //         var options = collections.filter((item) => {
        //             return item.fields.find((field) => {
        //                 return field.name.toLowerCase().indexOf('sph') !== -1;
        //             });
        //         }).map((item) => {
        //             return {
        //                 label: item.title,
        //                 value: item.name,
        //             }
        //         });
        //         return {
        //             title: t('Collection'),
        //             options: options,
        //             value: filed.componentProps?.collectionName,
        //             onChange(v) {
        //                 patch({
        //                     'x-component-props': {
        //                         collectionName: v,
        //                     },
        //                 });
        //             },
        //         }
        //     }
        // },
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
