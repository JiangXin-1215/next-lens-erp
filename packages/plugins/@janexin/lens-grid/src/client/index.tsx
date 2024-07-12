//客户端插件入口文件
import { Plugin } from '@nocobase/client';
import { LensGrid } from './component';
import { useGridProps } from './schema';
import { gridSettings } from './settings';
import { gridInitializer } from './initializer';

export class LensGridClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() { }

  // You can get and modify the app instance here
  async load() {
    // console.log(this.app);
    //注册组件
    this.app.addComponents({ LensGrid });
    //将 useGridProps 注册到系统中，这样 Schema 中x-use-component-props 才能找到对应的 scope。
    this.app.addScopes({ useGridProps });
    this.app.schemaSettingsManager.add(gridSettings);
    //注册到页面block中
    this.app.schemaInitializerManager.addItem('page:addBlock', `dataBlocks.${gridInitializer.name}`, gridInitializer);
    //注册到弹框block中
    this.app.schemaInitializerManager.addItem('popup:addNew:addBlock', `dataBlocks.${gridInitializer.name}`, gridInitializer);
    //注册到移动端block中
    this.app.schemaInitializerManager.addItem('mobilePage:addBlock', `dataBlocks.${gridInitializer.name}`, gridInitializer);
    // this.app.addProvider()
    // this.app.addProviders()
    // this.app.router.add()
  }
}

export default LensGridClient;
