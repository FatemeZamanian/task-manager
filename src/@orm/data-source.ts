import { DataSource } from "typeorm"
import { config } from "dotenv"
import { join } from "path"
import { ProductEntity } from "./models/product.model"
import { UserProductEntity } from "./models/user_product.model"
import { UsersEntity } from "./models/user.model"
import { TasksEntity } from "./models/task.model"

config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [ProductEntity, UserProductEntity, UsersEntity, TasksEntity],
  migrations: [join(__dirname, "migrations", "*.ts"), join(__dirname, "migrations", "*.js")],
  synchronize: false,
  logging: true,
})
