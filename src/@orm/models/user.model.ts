import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './types/role.enum'
import { TasksEntity } from './task.model'
import { UserProductEntity } from './user_product'

@Entity({ name: 'user' })
export class UsersEntity {
  @OneToMany(() => TasksEntity, task => task.user)
  tasks: TasksEntity[]

  @OneToMany(() => UserProductEntity, userProduct => userProduct.user)
  userProduct: UserProductEntity[]

  //****************************************************

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  phonenumber: string

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole
}
