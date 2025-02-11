import type { NewDepartmentDto } from '../department.dtos'
import type { Record } from 'src/pages/deparment/deparment.models'

export const NewDepartmentDtoExtensions = {
  fromRecord(record: Record): NewDepartmentDto {
    const res: NewDepartmentDto = {
      key: record.key,
      name: record.name,
      description: record.description,
    }

    return res
  },
}
