import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { LoginUserDtoIn, UserRegisterDtoIn } from "./user.type"
import { UserService } from "./user.service"

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  async register(@Body() body: UserRegisterDtoIn) {
    return this.userService.register(body)
  }
  @Post("login")
  @ApiOperation({ summary: "create user token" })
  async login(@Body() body: LoginUserDtoIn) {
    return this.userService.login(body)
  }
}
