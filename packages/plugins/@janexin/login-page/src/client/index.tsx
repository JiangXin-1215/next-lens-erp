import { Plugin } from '@nocobase/client';
import { CustomAuthLayout } from './AuthLayout';

export class LoginPageClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() { }

  // You can get and modify the app instance here
  async load() {
    //重复添加会覆盖原有的路由
    this.app.router.add('auth', {
      Component: CustomAuthLayout,
    });
    // this.app.addComponents({})
    // this.app.addScopes({})
    // this.app.addProvider()
    // this.app.addProviders()
    // this.app.router.add()
  }
}

export default LoginPageClient;
