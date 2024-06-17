import "reflect-metadata";
import { AppDataSource } from "./data-source"
// 引入刚刚定义的实体类
import { User } from "./entity/User";
import { createConnection } from "typeorm";

// 添加数据
async function  insert(){
  await AppDataSource.connect()
  const user = new User()
  user.username = '张三12';
  user.password = '1234567';
  // save里面传递一个对象
  AppDataSource.manager.save(user).then(user => {
    console.log('插入成功', user);
  });
}
// insert()


// 删除数据
/**
 * 
 * @param id 
AppDataSource.manager.delete(User, id)：
这个方法使用了 EntityManager 对象来执行删除操作。
EntityManager 是 TypeORM 中一个重要的 API，用于管理实体对象的持久性状态，
可以执行创建、更新和删除等操作。

AppDataSource.getRepository(User)：
这个方法使用了 Repository 对象来执行删除操作。
Repository 对象是 EntityManager 的一个子集，提供了更高级的查询和操作方法，
比如 find、findOne、remove、save 等。

AppDataSource.createQueryRunner()：这个方法创建了一个 QueryRunner 对象，
然后使用它来执行删除操作。QueryRunner 是 TypeORM 中用于执行查询和操作的低级 API，
它可以与多个数据源交互，并支持事务处理、批量操作等高级功能。
 */
async function del(id:number) {
  await AppDataSource.connect()
  // 方法一
  // await AppDataSource.manager.delete(User, id);

  // 方法二
  // const userRepo = AppDataSource.getRepository(User).extend({});
  // console.log(userRepo.findOneBy({id}))
  // const user = await userRepo.findOneBy({username:"张三"});
  // if (!user) {
  //   throw new Error(`User with id ${id} not found.`);
  // }
  // await userRepo.remove(user);
  
  // 方法三
  const runner = AppDataSource.createQueryRunner();
  AppDataSource.createQueryBuilder(runner)
    .delete()
    .from(User)
    .where("id = :id", { id })
    .execute()
}

// del(1)

async function update(username:string){
  await AppDataSource.connect();
  const userRepo = AppDataSource.getRepository(User).extend({});
  const user = await userRepo.findOneBy({username});
  user.password = 'pittle123';
  await userRepo.save(user)
}

update('pittle')

