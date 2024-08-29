import { ButtonEditor, SchemaSettings, useSchemaToolbar } from "@nocobase/client";
import { BlockNameLowercase } from "../../../../constants";

export const lensERPFrameFormSubmitActionSettings = new SchemaSettings({
    name: `${BlockNameLowercase}:submit`,
    items: [
        {
            name: 'editButton',
            Component: ButtonEditor,
            useComponentProps() {
                const { buttonEditorProps } = useSchemaToolbar();
                return buttonEditorProps;
            },
        },
        {
            name: 'remove',
            type: 'remove',
        }
    ]
})