import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TasksEntity } from "../../@orm/models/task.model"
import { ManageTaskService } from "../controllers/manage/manage.service"
import { ManageTaskController } from "../controllers/manage/manage.controller"
import { JwtService } from "@nestjs/jwt"

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  controllers: [ManageTaskController],
  providers: [ManageTaskService, JwtService],
  exports: [ManageTaskService],
})
export class TaskModule {}
