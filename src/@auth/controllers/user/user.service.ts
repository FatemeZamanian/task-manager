import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { UsersEntity } from "../../../@orm/models/user.model"
import { LoginUserDtoIn, UserRegisterDtoIn } from "./user.type"
import { UserRole } from "../../../@orm/models/types/role.enum"
import { JwtService, JwtSignOptions } from "@nestjs/jwt"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwt: JwtService,
  ) {}

  async register(body: UserRegisterDtoIn) {
    await this.ensureUserDoesNotExist(body)
    const hashedPassword = await this.hashPassword(body.password)
    const newUser = this.userRepository.create({
      ...body,
      password: hashedPassword,
      role: UserRole.USER,
    })

    try {
      const savedUser = await this.userRepository.save(newUser)
      return {
        success: true,
        message: "User registered successfully",
      }
    } catch (error) {
      throw new InternalServerErrorException("Failed to create user")
    }
  }

  private async ensureUserDoesNotExist(dto: UserRegisterDtoIn): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    })

    if (user) {
      throw new BadRequestException("User with this email or username already exists")
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  async login(body: LoginUserDtoIn): Promise<string> {
    const user = await this.userRepository.findOne({
      where: [{ username: body.username.toLowerCase() }],
    })
    if (!user) throw new HttpException("not found user", HttpStatus.NOT_FOUND)
    const validPassword = await bcrypt.compare(body.password, body.password)
    if (!validPassword) throw new HttpException("password is wrong", HttpStatus.BAD_REQUEST)
    return await this.createUserToken(user)
  }

  private async createUserToken(user: UsersEntity) {
    const token = this.jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    })
    return token
  }
}
