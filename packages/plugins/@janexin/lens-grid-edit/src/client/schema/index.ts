//组件渲染
import { BlockName, BlockNameLowercase } from "../constants";
import { gridEditSettings } from "../settings";
import { ISchema } from "@nocobase/client";
import { LensGridEditProps } from "../component/LensGridEdit";
import { useFieldSchema } from '@formily/react';

export function useLensGridEditProps(): LensGridEditProps {
  const fieldSchema = useFieldSchema();
  return fieldSchema.parent?.['x-decorator-props']?.[BlockNameLowercase];
}

export const lensGridEditSchema: ISchema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-decorator-props': {
    [BlockNameLowercase]: {}
  },
  properties: {
    [BlockNameLowercase]: {
      'x-component': BlockName,
      'x-use-component-props': 'useLensGridEditProps'
    }
  },
  'x-settings': gridEditSettings.name,
};