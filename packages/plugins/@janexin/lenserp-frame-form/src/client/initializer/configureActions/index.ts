import { SchemaInitializer } from "@nocobase/client";
import { BlockNameLowercase } from "../../constants";
import { usePluginTranslation } from "../../locale";
import { submitActionInitializerItem } from "./items/submit";

export const lensERPFrameFormConfigureActionsInitializer = new SchemaInitializer(
    () => {
        const { t } = usePluginTranslation();
        return {
            name: `${BlockNameLowercase}:configureActions`,
            icon: 'SettingOutlined',
            title: t('ConfigureActions'),
            style: {
                marginLeft: 8,
            },
            items: [
                submitActionInitializerItem,
                {
                    name: 'customRequest',
                    title: t('CustomRequest'),
                    Component: 'CustomRequestInitializer',
                },
            ]
        }
    }
);