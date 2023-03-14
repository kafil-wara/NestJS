import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
import { ManyToOne } from 'typeorm';

//entity file for user type User
@Entity("user")
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isblocked: boolean;

  @Column()
  filename: string;

  
  

  @ManyToOne(() => Admin, admin => admin.users)
  //@JoinColumn({ name: 'admin_id' })
  admin: Admin;

  

}

