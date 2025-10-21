import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import { TasksEntity } from "../../../@orm/models/task.model"

@Injectable()
export class ManageTaskService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly jwt: JwtService,
  ) {}

  async getAllTasks(req: Request) {
    const userId = (req.body as any).jwt.id
    this.taskRepository
      .createQueryBuilder("t")
      .innerJoin("t.user", "u")
      .where("u.id = :userId", userId)
      .select(["u", "t"])
      .getMany()
  }
}
