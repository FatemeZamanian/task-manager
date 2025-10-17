import { Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { UsersEntity } from "../../../@orm/models/user.model"
import { UserRegisterDtoIn } from "./user.type"
import { UserRole } from "../../../@orm/models/types/role.enum"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
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
}
