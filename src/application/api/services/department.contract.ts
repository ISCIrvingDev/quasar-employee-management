import type {
  GetDeletedDepartmentDto,
  GetDepartmentDto,
  NewDepartmentDto,
} from './dtos/department.dtos'

export interface IDeparmentContract {
  getAllDepartments(): Promise<GetDepartmentDto[]>
  getDepartmentById(id: number): Promise<GetDepartmentDto>
  createDepartment(newDepartmentDto: NewDepartmentDto): Promise<GetDepartmentDto>
  updateDepartmentById(
    id: number,
    updateDepartmentValuesDto: NewDepartmentDto,
  ): Promise<GetDepartmentDto>
  deleteDepartmentById(id: number): Promise<GetDeletedDepartmentDto>
}
