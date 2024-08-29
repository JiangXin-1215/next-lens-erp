import { Plugin } from '@nocobase/client';
import { LensERPFrameForm } from './component/LensErpFrameForm';
import { useLensERPFrameFormProps } from './schema';
import { lensERPFrameFormInitializerItem } from './initializer';
import { lensERPFrameFormSettings } from './settings';
import { lensERPFrameFormConfigureActionsInitializer } from './initializer/configureActions';
import { lensERPFrameFormSubmitActionSettings, uselenERPFrameFormSubmitActionProps } from './initializer/configureActions/items/submit';
import { lensERPFrameFormConfigureFieldsInitializer } from './initializer/configFields ';

export class LenserpFrameFormClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() { }

  // You can get and modify the app instance here
  async load() {
    //注册组件
    this.app.addComponents({ LensERPFrameForm });

    this.app.addScopes({ useLensERPFrameFormProps, uselenERPFrameFormSubmitActionProps });
    // //注册设置
    // this.app.schemaSettingsManager.add(lensERPFrameFormSettings);
    // this.app.schemaSettingsManager.add(lensERPFrameFormSubmitActionSettings);
    // //注册初始化器
    // this.app.schemaInitializerManager.add(lensERPFrameFormConfigureActionsInitializer, lensERPFrameFormConfigureFieldsInitializer);
    // //注册到页面block中
    // this.app.schemaInitializerManager.addItem('page:addBlock', `dataBlocks.${lensERPFrameFormInitializerItem.name}`, lensERPFrameFormInitializerItem);
    // //注册到弹框block中
    // this.app.schemaInitializerManager.addItem('popup:addNew:addBlock', `dataBlocks.${lensERPFrameFormInitializerItem.name}`, lensERPFrameFormInitializerItem);
  }
}

export default LenserpFrameFormClient;
