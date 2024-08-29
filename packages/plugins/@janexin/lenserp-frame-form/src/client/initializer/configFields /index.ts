import { gridRowColWrap, SchemaInitializer, useFormItemInitializerFields } from "@nocobase/client";
import { BlockNameLowercase } from '../../constants';
import { usePluginTranslation } from '../../locale';
export const lensERPFrameFormConfigureFieldsInitializer = new SchemaInitializer(
    () => {
        const { t } = usePluginTranslation();
        return {
            name: `${BlockNameLowercase}:configureFields`,
            icon: 'SettingOutlined',
            wrap: gridRowColWrap,
            title: t('ConfigureFields'),
            items: [
                {
                    type: 'itemGroup',
                    name: 'displayFields',
                    title: t('DisplayFields'),
                    useChildren: useFormItemInitializerFields,
                },
                {
                    name: 'divider',
                    type: 'divider',
                },
                {
                    name: 'addText',
                    title: t('AddText'),
                    Component: 'MarkdownFormItemInitializer',
                },
            ]
        };
    }
);