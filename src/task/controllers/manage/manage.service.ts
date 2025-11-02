import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import { TasksEntity } from "../../../@orm/models/task.model"
import to from "await-to-js"
import { AddTaskDtoIn, getTaskDtoOut } from "./manage.type"
import { title } from "process"

@Injectable()
export class ManageTaskService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly jwt: JwtService,
  ) {}

  async getAllTasks(req: Request): Promise<Array<getTaskDtoOut>> {
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
    const results = tasks.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
      }
    })
    return results
  }

  async getTaskById(req: Request, id: number): Promise<getTaskDtoOut> {
    const userId = (req.body as any).jwt.id
    const [err, task] = await to(
      this.taskRepository
        .createQueryBuilder("t")
        .innerJoin("t.user", "u")
        .where("u.id = :userId", { userId })
        .andWhere("t.id = :id", { id })
        .select(["u.id", "t"])
        .getOne(),
    )
    if (err) throw new HttpException("error in get tasks results", HttpStatus.INTERNAL_SERVER_ERROR)
    if (!task) throw new HttpException("not found task", HttpStatus.NOT_FOUND)
    return {
      id: task.id,
      title: task.title,
      description: task.description,
    }
  }
  async addTask(req: Request, body: AddTaskDtoIn): Promise<number> {
    const userId = (req.body as any).jwt.id
    const [err, task] = await to(
      this.taskRepository.save({
        userId,
        title: body.title,
        description: body.description,
      }),
    )
    if (err) throw new HttpException("error in save task", HttpStatus.INTERNAL_SERVER_ERROR)
    return task.id
  }
}
