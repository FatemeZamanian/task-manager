import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserController } from "../controllers/user/user.controller"
import { UserService } from "../controllers/user/user.service"
import { UsersEntity } from "../../@orm/models/user.model"

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class AuthModule {}
