import {
  Entity,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ default: null })
  name: string;
}
