import { ApiProperty } from "@nestjs/swagger"

export class getTaskDtoOut {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description?: string
}

export class AddTaskDtoIn {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string
}
