import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { UserExtend } from "./entity/UserExtend"
import { Profile } from "./entity/Profile"
import { Posts } from "./entity/Posts"
import { Tags } from "./entity/Tags"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "rootroot",
    database: "typeorm",
    logging: false,
    entities: [User,UserExtend,Profile,Posts,Tags],
    subscribers: [],
    migrations: [ // 数据迁移文件生成的地方
      "src/migration/**/*.ts"
    ],
    // dropSchema: false, 
    synchronize: true,
})

// {
//   "type": "mysql", // 选用的数据库
//   "host": "localhost", // 数据库地址
//   "port": 3306, // 数据库端口
//   "username": "test", // 数据库用户名
//   "password": "test", // 数据库密码
//   "database": "test", // 数据库
//   "synchronize": true, // 是否同步true表示会自动将src/entity里面定义的数据模块同步到数据库生成数据表(已经存在的表的时候再运行会报错)
//   "dropSchema": true, // 删除数据库中的表
//   "logging": false, // 是否打印日志,执行sql语句时候输出原生sql,也可以配置成一个数组["query", "error", "schema"]指定sql的执行类型
//   "charset": "utf8mb4", // 编码
//   "timezone": "local", // 时区,默认本地,也可以写"+8"
//   "entityPrefix": "", // 给此数据库连接上的所有表（或集合）加的前缀。
//   "entities": [ // 定义TypeORM需要查找的数据模型的,可以定义多个
//       "src/entity/**/*.ts"
//   ],
//   "migrations": [ // 数据迁移文件生成的地方
//       "src/migration/**/*.ts"
//   ],
//   "subscribers": [ // 订阅(用的少)
//       "src/subscriber/**/*.ts"
//   ],
//   "cli": { // 数据迁移工具使用的
//       "entitiesDir": "src/entity",
//       "migrationsDir": "src/migration",
//       "subscribersDir": "src/subscriber"
//   }
// }