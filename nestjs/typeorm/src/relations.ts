import { AppDataSource } from "./data-source";
import { Posts } from "./entity/Posts";
import { Profile } from "./entity/Profile";
import { Tags } from "./entity/Tags";
import { User } from "./entity/User";
import { UserExtend } from "./entity/UserExtend";

// 1. one to one 
// 插入数据
// async function relations(){
//   await AppDataSource.connect();
//   const user = new User();
//   user.username = 'ann1';
//   user.password = '123456'
//   const userDetail = new UserExtend();
//   userDetail.address = "shengzhen";
//   userDetail.mobile = "123123123";
//   userDetail.user = user;
//   await AppDataSource.manager.save(user)
// }

// 表示插入一条user数据 然后再插入一条 profile数据  然后互相关联
// async function relations(){
//   await AppDataSource.initialize();
//   const user = new User();
//   user.username = 'ann pittle three';
//   const profile = new Profile();
//   profile.photo = "123123123";
//   profile.gender = 'man'
//   user.profile = profile;
//   profile.user = user;
//   // await AppDataSource.manager.save(user)
//   await AppDataSource.manager.save(profile)
// }

// relations();

// 启用级联后插入数据  表示新增的一条profile和已有的user关联
// async function relations(){
//   await AppDataSource.initialize();
//    const userRepo = AppDataSource.getRepository(User).extend({});
//   const user = await userRepo.findOneBy({username:"111122"});
//   const profile = new Profile();
//   profile.photo = "123123123";
//   profile.gender = 'man1'
//   profile.user = user;
//   await AppDataSource.manager.save(profile)
// }
// relations();

// 查找关联数据
// async function findRelations(){
//   const connection = await AppDataSource.initialize();
//   const userRepository = connection.getRepository(User);
//   const users = await userRepository.find({ relations: ["profile"] }); // 查找user表和关联的字段数据
//   // const users = await userRepository.find(); // 查找user表的所有数据
//   console.log(users)

// }
// findRelations();

// 反向查询用户信息(一般一对一的关系中很少使用)
// async function findRelationsUserExtend(){
//   const connection = await AppDataSource.initialize();
//   const userExtendRepository = connection.getRepository(UserExtend);
//   const result = await userExtendRepository.find({ relations: ["user"] }); // 查找user表和关联的字段数据
//   console.log(result)

// }

// findRelationsUserExtend()



// 2. one to many
// async function OnetoMany() {
//   const connection = await AppDataSource.initialize();
//    // 帖子一
//   const posts1 = new Posts();
//   posts1.title = '文章一';
//   posts1.content = '文章一内容';

//   // 帖子二
//   const posts2 = new Posts();
//   posts2.title = '文章二';
//   posts2.content = '文章二内容';

//   // 创建一个用户
//   const user = new User();
//   user.username = '王五';
//   user.password = '123456';
//   user.posts = [posts1, posts2];

//   const userRepository = connection.getRepository(User);
//   const postsRepository = connection.getRepository(Posts);
//   await postsRepository.save(posts1);
//   await postsRepository.save(posts2);
//   await userRepository.save(user);
//   console.log('添加数据成功');
// }
// OnetoMany();

// 查询数据
// async function OnetoManyFind() {
//   // 正向查询数据(从单对多的方向查询)
//   const connection = await AppDataSource.initialize();
//   // const userRepository = connection.getRepository(User);
//   // // relations存放一个数组,可以存放多个关联关系的
//   // const result = await userRepository.find({ relations: ['posts'] });
//   // console.log(result);

//   // 反向查询数据
//   const postsRepository = connection.getRepository(Posts);
//   const result = await postsRepository.find({ relations: ['user'] });
//   console.log(result);
// }
// OnetoManyFind();


// 3. many to many
// async function ManyToMany(){
//   const connection = await AppDataSource.initialize();
//   // 创建tag1
//   const tag1 = new Tags();
//   tag1.name = 'mysql';

//   // 创建tag2
//   const tag2 = new Tags();
//   tag2.name = 'node';

//   // 帖子一
//   const posts1 = new Posts();
//   posts1.title = '文章一1';
//   posts1.content = '文章一内容1';
//   posts1.tags = [tag1, tag2];

//   // 帖子二
//   const posts2 = new Posts();
//   posts2.title = '文章二2';
//   posts2.content = '文章二内容2';
//   posts2.tags = [tag1];

//   // 创建一个用户
//   const user = new User();
//   user.username = '王五';
//   user.password = '123456';
//   user.posts = [posts1, posts2];


//   const userRepository = connection.getRepository(User);
//   const postsRepository = connection.getRepository(Posts);
//   const tagRepository = connection.getRepository(Tags);
//   await tagRepository.save(tag1);
//   await tagRepository.save(tag2);

//   await postsRepository.save(posts1);
//   await postsRepository.save(posts2);
//   await userRepository.save(user);
//   console.log('添加数据成功');
// }

// ManyToMany();

// 查询帖子一拥有的tag及用户信息
async function Manyfind() {
  const connection = await AppDataSource.initialize();
  // const postsRepository = connection.getRepository(Posts);
  // const result = await postsRepository.findOne({ where: { id: 4 }, relations: ['tags', 'user'] });
  // console.log(result);

  // 6.relations关系查询
  // const userRepository = connection.getRepository(User);
  // const result = await userRepository.find({ relations: ['userDetail'] });
  // console.log(result);

  // 7.使用join
  const userRepository = connection.getRepository(User);
  const result = await userRepository.find({
      join: {
          alias: 'user',
          leftJoinAndSelect: {
              detail: 'user.userDetail',
              posts: 'user.posts'
          }
      }
  });
  console.log(result);
}

Manyfind();