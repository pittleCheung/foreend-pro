import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./User"

@Entity({ name: "user_extend" })
export class UserExtend {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "主键id",
  })
  id: number

  @Column({
    type: "varchar",
    length: 11,
    nullable: true,
    name: "mobile",
    comment: "手机号码",
  })
  mobile: string

  @Column({
    type: "varchar",
    length: 50,
    nullable: true,
    name: "address",
    comment: "地址",
  })
  address: string

  // 使用@OneToOne装饰允许我们在两个实体之间创建一对一的关系
  // @OneToOne((type) => User)
  // 使用@OneToOne装饰允许我们在两个实体之间创建一对一的关系
  // user => user.userDetail表示反向关系查询的
  @OneToOne(type => User, user => user.userDetail)
  // @JoinColumn装饰器，表明实体键的对应关系,不是有关系的都要使用,只是在拥有外键约束的这张表的数据模型中使用
  @JoinColumn()
  user: User
}