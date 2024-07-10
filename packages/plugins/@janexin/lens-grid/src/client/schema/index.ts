//组件渲染
import { useCollection, useDataBlockRequest } from "@nocobase/client";

import { LensGridProps } from "../component";
import { BlockName, BlockNameLowercase } from "../constants";
import { gridSettings } from "../settings";

//useGridProps()：用于处理 LensGrid 组件的动态属性，并且因为要存到数据库，所以这里的值类型为 string 类型。
export function useGridProps(): LensGridProps {
    const collection = useCollection();
    const { data, loading } = useDataBlockRequest<any[]>();

    return {
        collectionName: collection.name,
        data: data?.data,
        loading: loading
    }
}

//getGridSchema()：之所以定义为函数，因为 dataSource 和 collection 是动态的，由点击的数据表决定
//返回的是一个对象，包含了组件的属性和类型等信息
export function getGridSchema({ dataSource = 'main', collection }) {
    return {
        type: 'void',
        'x-decorator': 'DataBlockProvider',
        'x-decorator-props': {
            dataSource,
            collection,
            action: 'list',
        },
        'x-settings': gridSettings,
        'x-component': 'CardItem',
        properties: {
            [BlockNameLowercase]: {
                type: 'void',
                'x-component': BlockName,
                'x-use-component-props': 'useGridProps',
            }
        }
    }
}