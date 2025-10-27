import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import { TasksEntity } from "../../../@orm/models/task.model"
import to from "await-to-js"

@Injectable()
export class ManageTaskService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly jwt: JwtService,
  ) {}

  async getAllTasks(req: Request) {
    const userId = (req.body as any).jwt.id
    const [err, tasks] = await to(
      this.taskRepository
        .createQueryBuilder("t")
        .innerJoin("t.user", "u")
        .where("u.id = :userId", { userId })
        .select(["u", "t"])
        .getMany(),
    )
    if (err) throw new HttpException("error in get tasks results", HttpStatus.INTERNAL_SERVER_ERROR)
    return tasks
  }
}
