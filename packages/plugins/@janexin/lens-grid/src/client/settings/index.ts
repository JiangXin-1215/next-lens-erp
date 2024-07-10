// Schema设置
import { SchemaSettings, useCollection, useDesignable } from "@nocobase/client";
import { BlockNameLowercase } from "../constants";
import { useTranslation } from 'react-i18next';
import { useFieldSchema } from '@formily/react';

export const gridSettings = new SchemaSettings({
    name: `blockSettings:${BlockNameLowercase}`,
    items: [
        {
            type: 'select',
            name: 'GridXField',
            useComponentProps() {
                const collection = useCollection();
                const { t } = useTranslation();
                // useEffect(() => {
                //     setSchema(pageSchema);
                //     // eslint-disable-next-line react-hooks/exhaustive-deps
                // }, [field.address, fieldSchema?.['x-action-settings']?.['exportSettings']]);
                return {
                    title: t('GridXField'),
                    options: collection.getFields().filter((field) => field.type === 'double').map((field) => {
                        return { label: field.uiSchema?.title || field.name, value: field.name }
                    }),
                };
            },
        },
        {
            type: 'select',
            name: 'GridYField',
            useComponentProps() {
                const collection = useCollection();
                const { t } = useTranslation();
                // useEffect(() => {
                //     setSchema(pageSchema);
                //     // eslint-disable-next-line react-hooks/exhaustive-deps
                // }, [field.address, fieldSchema?.['x-action-settings']?.['exportSettings']]);
                return {
                    title: t('GridYField'),
                    options: collection.getFields().filter((field) => field.type === 'double').map((field) => {
                        return { label: field.uiSchema?.title || field.name, value: field.name }
                    }),
                };
            },
        },
        {
            type: 'switch',
            name: 'readOnly',
            useComponentProps() {
                const { patch } = useDesignable();
                const { t } = useTranslation();
                const fieldSchema = useFieldSchema();
                return {
                    title: t('ReadOnly'),
                    checked: !!fieldSchema['x-component-props']?.readOnly,
                    onChange(v) {
                        patch({
                            'x-component-props': {
                                readOnly: v
                            }
                        });
                    },
                }
            }
        },
        {
            type: 'divider',
            name: 'divider'
        },
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

function useField() {
    throw new Error("Function not implemented.");
}
