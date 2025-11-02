import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common"
import { ManageTaskService } from "./manage.service"
import { ApiBadGatewayResponse, ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger"
import { AddTaskDtoIn, getTaskDtoOut } from "./manage.type"

@ApiTags("task")
@Controller("task")
@ApiBearerAuth()
@ApiExtraModels(getTaskDtoOut)
export class ManageTaskController {
  constructor(private manageTaskService: ManageTaskService) {}
  @Get("get-all")
  async getAll(@Req() req: Request): Promise<Array<getTaskDtoOut>> {
    return await this.manageTaskService.getAllTasks(req)
  }

  @Get("get/:id")
  async getById(@Req() req: Request, @Param("id") id: number): Promise<getTaskDtoOut> {
    return await this.manageTaskService.getTaskById(req, id)
  }

  @Post("add")
  async add(@Req() req: Request, @Body() body: AddTaskDtoIn): Promise<number> {
    return await this.manageTaskService.addTask(req, body)
  }

  @Put("edit")
  async edit() {}
}
