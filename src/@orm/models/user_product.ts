import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.model'
import { UsersEntity } from './user.model'

@Entity({ name: 'user_product' })
export class UserProductEntity {
  @ManyToOne(() => ProductEntity, product => product.userProduct)
  product: ProductEntity
  @Column()
  productId: number

  @ManyToOne(() => UsersEntity, user => user.userProduct)
  user: UsersEntity
  @Column()
  userId: number

  //*********************************************

  @PrimaryGeneratedColumn()
  id: number
}
