import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { resolve } from "path";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1657112302399_8779';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  const ROOT_PATH = resolve(__dirname, "../");
  const WWW_PATH =  resolve(ROOT_PATH, "../www/");
  const PACKAGES_PATH = resolve(ROOT_PATH, "../packages/");
  const pathConfig = {
    ROOT_PATH,
    WWW_PATH,
    PACKAGES_PATH
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...pathConfig,
  };
};
