## 外键

外键是在从表中，用来关联主表的。在关系型数据库中，外键约束用来确保从表中的外键值只能引用主表中存在的主键值。

## 关系

要启用级联，可以在实体中使用 @OneToOne、@OneToMany、@ManyToOne 或 @ManyToMany 装饰器来声明关系，然后使用 cascade 选项指定需要启用级联的操作。例如，在 User 实体中启用级联操作可以这样写

```js
@Entity()
export class User {
  // ...

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile

  // ...
}
```

这里的 cascade 选项指定了启用级联操作，true 表示启用所有级联操作，你也可以指定具体的级联操作，例如：

```js
@Entity()
export class User {
  // ...

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ["insert", "update"],
  })
  profile: Profile

  // ...
}
```

这里的 cascade 选项指定了只启用 insert 和 update 两种级联操作
cascade 启用级联后，只需一次 save 调用即可保存此关系。

## one to one

```js
// Profile.ts
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gender: string

  // @OneToOne(() => Profile)
  // @JoinColumn()  // 添加photeId
  @Column()
  photo: string

  @OneToOne(() => User, (user) => user.profile) // 将另一面指定为第二个参数
  @JoinColumn() // 添加外键userId
  user: User
}

// User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { UserExtend } from "./UserExtend"
import { Profile } from "./Profile"

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "主键id",
  })
  id: number

  @Column({
    type: "varchar",
    nullable: false,
    length: 50,
    // unique: true,
    name: "username", // 如果是一样的可以不指定
    default: "root",
    comment: "用户名",
  })
  username: string

  @Column({
    type: "varchar",
    nullable: false,
    length: 100,
    default: "rootroot",
    comment: "密码",
  })
  password: string

  @Column("tinyint", {
    nullable: false,
    default: () => 0,
    name: "is_del",
    comment: "是否删除,1表示删除,0表示正常",
  })
  isDel: number

  @CreateDateColumn({
    type: "timestamp",
    nullable: false,
    name: "created_at", // mysql数据库规范是使用下划线命名的,不使用驼峰
    comment: "创建时间",
  })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
    nullable: false,
    name: "updated_at",
    comment: "更新时间",
  })
  updateAt: Date

  @OneToOne((type) => UserExtend, (userExtend) => userExtend.user)
  userDetail: UserExtend

  // 一个参数是 () => Profile，表示另一个实体类的构造函数，即 Profile 类
  // 第二个参数是 profile => profile.user，
  // 表示该关系的反向字段是 Profile 类中名为 user 的字段。

  // cascade 启用级联后，只需一次save调用即可保存此关系。
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) // 指定另一面作为第二个参数
  profile: Profile
}
```

## 配置

```js
`synchronize: true` 是 TypeORM 中的一个选项，用于在应用启动时自动同步实体与数据库结构。
如果你的实体定义发生了变化（例如添加或删除属性），TypeORM 会自动检测到这些变化，并在数据库中添加或删除相应的列。
注意，这个选项只在开发和测试阶段使用，不应该在生产环境中启用。因为在生产环境中，你可能需要手动执行迁移脚本来确保数据不会被破坏。

`dropSchema: false` 表示在连接到数据库时，TypeORM 不会删除已有的数据库表。如果该选项设置为 true，每次连接到数据库时，TypeORM 将删除现有的数据库表并重新创建它们，这将清除所有表中的数据。因此，当我们在生产环境中使用数据库时，不建议将 dropSchema 设置为 true，以防止数据丢失。在开发环境中，我们可以设置为 true 以便重新构建数据库表。
```
