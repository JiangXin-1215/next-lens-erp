//组件渲染
import { BlockName, BlockNameLowercase } from "../constants";
import { gridEditSettings } from "../settings";
import { ISchema } from "@nocobase/client";

export const lensGridEditSchema: ISchema = {
    type: 'void',
    'x-settings': gridEditSettings,
    'x-component': 'CardItem',
    properties: {
      [BlockNameLowercase]: {
        'x-component': BlockName,
      }
    }
  };