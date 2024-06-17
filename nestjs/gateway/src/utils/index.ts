import { parse } from 'yaml';
const path = require('path');
const fs = require('fs');

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
// export const getConfig = () => {
//   const environment = getEnv();
//   const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
//   const file = fs.readFileSync(yamlPath, 'utf8');
//   const config = parse(file);
//   // console.log(config, 'config');
//   return config;
// };
// 改造之前获取环境变量的方法，可以根据传入的变量名获取对应的配置：
export const getConfig = (type?: string) => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  if (type) {
    return config[type];
  }
  return config;
};
