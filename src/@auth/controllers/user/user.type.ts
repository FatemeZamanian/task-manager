import { ApiProperty } from "@nestjs/swagger"
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator"

export class UserRegisterDtoIn {
  @ApiProperty({
    example: "Fateme",
    description: "User first name (max 50 characters)",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string

  @ApiProperty({
    example: "Zamanian",
    description: "User last name (max 50 characters)",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastname: string

  @ApiProperty({
    example: "fatemezmn",
    description: "Unique username (3-20 characters)",
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string

  @ApiProperty({
    example: "fateme@example.com",
    description: "User email address",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: "StrongPass123!",
    description: "Password with at least 8 characters, including uppercase, lowercase, and numbers",
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password: string

  @ApiProperty({
    example: "09121121232",
    description: "Optional phone number in international format",
    required: false,
  })
  @IsOptional()
  @Matches(/^(\+98|0)?9\d{9}$/, { message: "Invalid phone number" })
  phonenumber?: string
}

export class LoginUserDtoIn {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string
}
