import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { UserExtend } from "./UserExtend";
import { Profile } from "./Profile";
import { Posts } from "./Posts";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id'
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    name: 'username', // 如果是一样的可以不指定
    default:"root",
    comment: '用户名'
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    default:"rootroot",
    comment: '密码'
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    default:"extra",
    comment: '额外字段'
  })
  extra: string;


  @Column('tinyint', {
    nullable: false,
    default: () => 0,
    name: 'is_del',
    comment: '是否删除,1表示删除,0表示正常'
  })
  isDel: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at', // mysql数据库规范是使用下划线命名的,不使用驼峰
    comment: '创建时间'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  @OneToOne(type => UserExtend, userExtend => userExtend.user)
  userDetail: UserExtend;

  // 一个参数是 () => Profile，表示另一个实体类的构造函数，
  // 即 Profile 类，第二个参数是 profile => profile.user，
  // 表示该关系的反向字段是 Profile 类中名为 user 的字段。
  @OneToOne(() => Profile, profile => profile.user,{ cascade: true }) // 指定另一面作为第二个参数
  profile: Profile;

  // 一对多,自然Posts实体类中就是多对一的方式
  // post => post.user表示从post表中查询到user数据
  @OneToMany(type => Posts, post => post.user)
  posts: Posts[]
}