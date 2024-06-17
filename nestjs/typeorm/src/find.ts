import { AppDataSource } from "./data-source";
import { Posts } from "./entity/Posts";
import { Profile } from "./entity/Profile";
import { Tags } from "./entity/Tags";
import { User } from "./entity/User";
import { UserExtend } from "./entity/UserExtend";


// 使用QueryBuilder
// async function find() {
//     const connection = await AppDataSource.initialize();
//     const user = await connection.createQueryBuilder().select(['user.id', 'user.username']) // 需要选择查询的字段,如果想要全部查询可以不加select
//     .from(User, 'user') // 从哪张表,并且定义别名为user
//     .where('(user.id=:id)', { id: 2 }) // 过滤条件
//     .getOne(); // 查询一个

//     console.log(user)
// }


async function find() {
    await AppDataSource.initialize();
    const user = await AppDataSource.manager.findOneBy(User, {
      id: 1,
    })
    console.log(user)
}


find()