import { api } from 'boot/axios'
import type {
  GetDeletedDepartmentDto,
  GetDepartmentDto /*, NewDepartmentDto*/,
  NewDepartmentDto,
} from './dtos/department.dtos'
import type {
  // AppErrorResponseModel,
  AppResponseModel,
} from 'src/application/api/models/app-response.model'
import type { IDeparmentContract } from './department.contract'

// export const addRecord = async (newDepartmentDto: NewDepartmentDto) => {
//   const res = await api.get('')
// }

// export const editRecord = (records: Record[], index: number) => {
//   records[index] = {
//     ...formData.value,
//     updatedAt: new Date().toISOString(),
//   } as Record
// }

// export const deleteRecord = () => {
//   const id = idDeleteRecord.value

//   records.value = records.value.filter((r) => r.id !== id)

//   isDialogDeleteOpen.value = false
// }

export class DeparmentService implements IDeparmentContract {
  private _baseRoute = 'department'

  async getAllDepartments() {
    const res = await api.get<AppResponseModel<GetDepartmentDto[]>>(
      `${this._baseRoute}/getAllDepartments`,
    )
    const data: GetDepartmentDto[] = res.data.data

    return data
  }

  async getDepartmentById(id: number): Promise<GetDepartmentDto> {
    const res = await api.get<AppResponseModel<GetDepartmentDto>>(
      `${this._baseRoute}/getDepartmentById/${id}`,
    )
    const data: GetDepartmentDto = res.data.data

    return data
  }

  async createDepartment(newDepartmentDto: NewDepartmentDto): Promise<GetDepartmentDto> {
    const res = await api.post<AppResponseModel<GetDepartmentDto>>(
      `${this._baseRoute}/createDepartment`,
      newDepartmentDto,
    )
    const data: GetDepartmentDto = res.data.data

    return data
  }

  async updateDepartmentById(
    id: number,
    updateDepartmentValuesDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    const res = await api.put<AppResponseModel<GetDepartmentDto>>(
      `${this._baseRoute}/updateDepartmentById/${id}`,
      updateDepartmentValuesDto,
    )
    const data: GetDepartmentDto = res.data.data

    return data
  }

  async deleteDepartmentById(id: number): Promise<GetDeletedDepartmentDto> {
    const res = await api.delete<AppResponseModel<GetDeletedDepartmentDto>>(
      `${this._baseRoute}/deleteDepartmentById/${id}`,
    )
    const data: GetDeletedDepartmentDto = res.data.data

    return data
  }
}
