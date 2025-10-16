import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UsersEntity } from './user.model'

@Entity('task')
export class TasksEntity {
  @ManyToOne(() => UsersEntity, user => user.tasks)
  user: UsersEntity
  @Column()
  userId: number

  //*******************************************

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
}
