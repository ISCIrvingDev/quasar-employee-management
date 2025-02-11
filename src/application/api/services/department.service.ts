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
    const data: GetDepartmentDto[] = res.data.data as GetDepartmentDto[]

    return data
  }

  // 3) Aqui me quede: Terminar que definir el resto de los metodos del contrato
  getDepartmentById(id: number): Promise<GetDepartmentDto> {
    throw new Error('Method not implemented.' + id)
  }

  createDepartment(newDepartmentDto: NewDepartmentDto): Promise<GetDepartmentDto> {
    console.log(newDepartmentDto)

    throw new Error('Method not implemented.')
  }

  updateDepartmentById(
    id: number,
    updateDepartmentValuesDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto> {
    console.log(id)
    console.log(updateDepartmentValuesDto)

    throw new Error('Method not implemented.')
  }

  deleteDepartmentById(id: number): Promise<GetDeletedDepartmentDto> {
    console.log(id)
    throw new Error('Method not implemented.')
  }
}
