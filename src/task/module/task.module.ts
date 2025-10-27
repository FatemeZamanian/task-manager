import { MiddlewareConsumer, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TasksEntity } from "../../@orm/models/task.model"
import { ManageTaskService } from "../controllers/manage/manage.service"
import { ManageTaskController } from "../controllers/manage/manage.controller"
import { JwtService } from "@nestjs/jwt"
import { TaskMiddleware } from "../middleware/task.middleware"

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  controllers: [ManageTaskController],
  providers: [ManageTaskService, JwtService],
  exports: [ManageTaskService],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TaskMiddleware).forRoutes("task/*")
  }
}
