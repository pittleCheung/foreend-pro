import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Res {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pno: number;

  @Column()
  price: number;

  @Column()
  num: number;
}
