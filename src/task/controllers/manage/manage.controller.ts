import { Controller, Get, Req } from "@nestjs/common"
import { ManageTaskService } from "./manage.service"
import { ApiBadGatewayResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@ApiTags("task")
@Controller("task")
@ApiBearerAuth()
export class ManageTaskController {
  constructor(private manageTaskService: ManageTaskService) {}
  @Get("get-all")
  async getAll(@Req() req: Request) {
    return await this.manageTaskService.getAllTasks(req)
  }

  async getById() {}

  async add() {}

  async edit() {}
}
