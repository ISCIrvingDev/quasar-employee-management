import { IsNotEmpty, IsString, Length } from 'class-validator'

export class GetDepartmentDto {
  id: number
  createdAt: Date
  updatedAt: Date
  key: string
  name: string
  description: string | null
}

export class NewDepartmentDto {
  @IsString({ message: 'The key must be a string' })
  @IsNotEmpty({ message: 'The key cannot be empty' })
  @Length(5, 5, { message: 'The key must be 5 character length' })
  key: string

  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @Length(4, 35, {
    message: 'The name must have at least 4 and maximum 35 characters',
  })
  name: string

  description: string | null
}

export class GetDeletedDepartmentDto {
  id: number
  active: boolean
  createdAt: Date
  updatedAt: Date
  key: string
  name: string
  description: string | null
}
