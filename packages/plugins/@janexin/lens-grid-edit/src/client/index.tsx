import { Plugin } from '@nocobase/client';
import {LensGridEdit} from './component/LensGridEdit';
import { gridEditSettings } from './settings';
import { gridEditInitializerItem } from './initializer';

export class LensGridEditClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    // console.log(this.app);
    //注册组件
    this.app.addComponents({ LensGridEdit });
    //注册设置
    this.app.schemaSettingsManager.add(gridEditSettings);
    // this.app.pluginSettingsManager.add(BlockName, {
    //   title: '{{t("LensGrid Settings")}}',
    //   icon: 'ApiOutlined',
    //   component: SettingManeger,
    // });
    //注册到页面block中
    this.app.schemaInitializerManager.addItem('page:addBlock', `otherBlocks.${gridEditInitializerItem.name}`, gridEditInitializerItem);
    //注册到弹框block中
    this.app.schemaInitializerManager.addItem('popup:addNew:addBlock', `otherBlocks.${gridEditInitializerItem.name}`, gridEditInitializerItem);
    // this.app.addProvider()
    // this.app.addProviders()
    // this.app.router.add()
  }
}

export default LensGridEditClient;
