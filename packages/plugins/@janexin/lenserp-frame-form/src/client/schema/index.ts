//组件渲染
import { BlockName, BlockNameLowercase } from "../constants";
import { ISchema, useDataBlockProps } from "@nocobase/client";
import { LensERPFrameFormProps } from "../component/LensErpFrameForm";
import { lensERPFrameFormSettings } from "../settings";
import { lensERPFrameFormConfigureActionsInitializer } from "../initializer/configureActions";
import { lensERPFrameFormConfigureFieldsInitializer } from "../initializer/configFields ";

export function useLensERPFrameFormProps(): LensERPFrameFormProps {
    const blockProps = useDataBlockProps();
    return blockProps[BlockNameLowercase];
}

interface GetLensERPFrameFormOptions {
    dataSource?: string;
    collection: string;
    properties?: ISchema['properties'];
}


//函数式组件
export function getLensERPFrameFormSchema(options: GetLensERPFrameFormOptions): ISchema {
    const { dataSource, collection, properties = {} } = options;
    console.log('getLensERPFrameFormSchema', options);
    return {
        type: 'void',
        'x-component': 'CardItem',
        'x-decorator': 'DataBlockProvider',
        'x-decorator-props': {
            dataSource,
            collection,
            [BlockNameLowercase]: {},
        },
        properties: {
            [BlockNameLowercase]: {
                type: 'void',
                'x-component': BlockName,
                'x-use-component-props': 'useLensERPFrameFormProps',
                properties: {
                    ...(properties as object),
                    // fields: {
                    //     "type": "void",
                    //     "x-component": "Grid",
                    //     "x-initializer": lensERPFrameFormConfigureFieldsInitializer.name
                    // },
                    // actionBar: {
                    //     type: 'void',
                    //     "x-initializer": lensERPFrameFormConfigureActionsInitializer.name,
                    //     "x-component": "ActionBar",
                    //     "x-component-props": {
                    //         "layout": "one-column",
                    //         "style": {
                    //             "marginTop": 24
                    //         }
                    //     },
                    // },
                }

            },
        },
        'x-settings': lensERPFrameFormSettings.name
    }
}
