import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/admin/adminentity.entity';
import { ManyToOne } from 'typeorm';

//entity file for user type admin
@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => User, user => user.admin)
  users: User[];

}