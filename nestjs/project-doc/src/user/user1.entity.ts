import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  class: string;

  @Column()
  pass: string;
}

// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class TUser {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   class: string;

//   @Column()
//   pass: string;
// }
