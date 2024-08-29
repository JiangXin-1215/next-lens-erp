import { useForm } from '@formily/react';
import { App } from 'antd';
import { ActionProps, useDataBlockResource } from "@nocobase/client";
import { usePluginTranslation } from "../../../../locale";

export const uselenERPFrameFormSubmitActionProps = (): ActionProps => {
    const resource = useDataBlockResource();
    const form = useForm();
    const { message } = App.useApp();
    return {
        type: 'primary',
        htmlType: 'submit',
        async onClick() {
            await form.submit();
            const values = form.values;
            await resource.create({ values })
            await form.reset();
            message.success('Created successfully');
        },
    }
}

export const submitActionSchema = () => {
    const { t } = usePluginTranslation();
    return {
        type: 'void',
        title: t('Submit'),
        'x-component': 'Action',
        'x-use-component-props': 'useFormV3SubmitActionProps',
        'x-toolbar': 'ActionSchemaToolbar'
    }
};