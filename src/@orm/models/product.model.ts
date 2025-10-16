import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserProductEntity } from './user_product'

@Entity('product')
export class ProductEntity {
  @OneToMany(() => UserProductEntity, userProduct => userProduct.product)
  userProduct: UserProductEntity[]

  //********************************************

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
}
