export class GetDepartmentDto {
  id: number
  createdAt: Date
  updatedAt: Date
  key: string
  name: string
  description: string | null
}

// 1) Aqui me quede: Poner las validaciones del DTO con class-validator
export class NewDepartmentDto {
  key: string

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
