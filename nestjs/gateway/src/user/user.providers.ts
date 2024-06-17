import { User } from './user.mongo.entity';

// inject: 一个字符串类型的数组，表示要注入到 useFactory 参数中的依赖项的名称，也就是说，
// useFactory 将会接收 'MONGODB_DATA_SOURCE' 作为一个参数，该参数会被用于创建 User 仓库的实例。
// 这表示在调用 useFactory 时，会将名为 MONGODB_DATA_SOURCE 的依赖注入到 AppDataSource 参数中。
export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
