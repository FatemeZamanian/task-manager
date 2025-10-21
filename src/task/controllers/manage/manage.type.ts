import { ApiProperty } from "@nestjs/swagger"

export class AddTaskDtoIn {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string
}
