import { SchemaInitializerItemType, useSchemaInitializer } from "@nocobase/client";
import { submitActionSchema } from "./schema";
import { usePluginTranslation } from '../../../../locale';

export const submitActionInitializerItem: SchemaInitializerItemType =
    () => {
        const { t } = usePluginTranslation();
        return {
            type: 'item',
            name: 'submit',
            title: t('Submit'),
            useComponentProps() {
                const { insert } = useSchemaInitializer();
                return {
                    onClick() {
                        insert(submitActionSchema())
                    },
                };
            },
        }
    };