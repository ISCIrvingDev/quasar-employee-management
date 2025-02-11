import type { GetDepartmentDto } from '../department.dtos'
import type { Record } from 'src/pages/deparment/deparment.models'

export const GetDepartmentDtoExtensions = {
  toRecord(getDepartmentDto: GetDepartmentDto): Record {
    const res: Record = {
      id: getDepartmentDto.id,
      createdAt: getDepartmentDto.createdAt.toString(),
      updatedAt: getDepartmentDto.updatedAt.toString(),
      key: getDepartmentDto.key,
      name: getDepartmentDto.name,
      description: getDepartmentDto.description,
    }

    return res
  },
}
