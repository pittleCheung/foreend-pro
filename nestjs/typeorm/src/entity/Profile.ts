import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  // @OneToOne(() => Profile)
  // @JoinColumn()  // 添加photeId
  @Column()
  photo: string;

  @OneToOne(() => User, user => user.profile) // 将另一面指定为第二个参数
  @JoinColumn()  // 添加外键userId
  user: User;
}