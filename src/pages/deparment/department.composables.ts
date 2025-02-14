/*
 * Modelos & Columnas del Data Table
 */
import type { Record } from './deparment.models'

/*
 * Vue Reactivity
 */
import { onMounted, ref } from 'vue'

/*
 * Contract
 */
import type { IDeparmentContract } from 'src/application/api/services/department.contract'

/*
 * Quasar Plugings:
 * Notify
 */
import type { QNotifyUpdateOptions } from 'quasar'
import { Notify } from 'quasar'
import { NewDepartmentDtoExtensions } from 'src/application/api/services/dtos/extensions/new-department-dto.extension'
import { GetDepartmentDtoExtensions } from 'src/application/api/services/dtos/extensions/get-department-dto.extension'

/*
 * Validations
 */
import type { AppInputValidationService } from 'src/application/validations/app-input-validation.services'
import type { AppInputValidationModel } from 'src/application/validations/app-input-validation.models'
import type { ValidationError } from 'class-validator'
import { validate } from 'class-validator'
import { NewDepartmentDto } from 'src/application/api/services/dtos/department.dtos'

/*
 * Variables
 */
// Valor del "mode": "edit" || "new"
const editMode = ref(false)

// Valor del registro actual seleccionado (ya sea en "edit" o en "new")
const formData = ref<Partial<Record>>({})

// Todos los registros de la tabla
const rows = ref<Record[]>([])

// Valor del registro actual seleccionado (ya sea en "edit" o en "new")
const idDeleteRecord = ref<number>(0)

// Valor del modal Edit/Add
const isDialogEditAddOpen = ref(false)

// Valor del modal Delete
const isDialogDeleteOpen = ref(false)

// Valor del modal Details
const isDialogOpenDetails = ref(false)

// Validations
const dtoValidations = ref({ isValid: [true], errors: [] } as AppInputValidationModel)

/*
 * Variables reactivas
 */
export function useInit(deparmentService: IDeparmentContract) {
  // -------------------------------------------------------------
  // Agregar aqui la logica para implementar el "get" de la BD
  /*
   * Metodos del "Service"
   */
  onMounted(async () => {
    let dismiss: (props?: QNotifyUpdateOptions) => void

    try {
      dismiss = Notify.create({
        spinner: true,
        type: 'info',
        message: 'Loading...',
        position: 'top-right',
        timeout: 0,
      })

      const res = await deparmentService.getAllDepartments()
      console.info('Resultado del API - deparmentService.getAllDepartments: ', res)

      rows.value = res.map((e) => {
        return GetDepartmentDtoExtensions.toRecord(e)
      })
    } catch (error) {
      console.error('department.composables.ts - deparmentService.getAllDepartments: ', error)
      // const err = error as AppResponseModel<AppErrorResponseModel>

      Notify.create({
        type: 'negative',
        // message: err.data.message.toString(),
        // // eslint-disable-next-line @typescript-eslint/no-base-to-string
        // message: String(error),
        message: 'Please contact the software team',
        position: 'top-right',
        timeout: 5000,
      })
    } finally {
      dismiss()
    }
  })
  // -------------------------------------------------------------

  return {
    editMode,
    formData,
    rows,
    idDeleteRecord,
    isDialogEditAddOpen,
    isDialogDeleteOpen,
    isDialogOpenDetails,
    dtoValidations,
  }
}

/*
 * Metodos del "Presenter"
 */
// Dialog Edit/Add Handler
export function useOpenDialogEditAdd(record?: Record) {
  editMode.value = !!record // Si hay "record", editMode es true (edit mode), de lo contrario es false (new mode)
  formData.value = record ? { ...record } : { key: '', name: '', description: '' } // Si hay "record", registra los nuevos valores (edit mode), de lo contrario todos los valores son reseteados con su valor por defecto (new mode)
  isDialogEditAddOpen.value = true // Modal abierto
}

// Dialog Details Handler
export function useOpenDialogDetails(record?: Record) {
  formData.value = record // { ...record }
  isDialogOpenDetails.value = true // Modal abierto
}

// Dialog Delete Handler
export function useOpenDialogDelete(id: number) {
  isDialogDeleteOpen.value = true // Modal abierto

  idDeleteRecord.value = id
}

/*
 * Validations
 */
export async function useInitValidations(appInputValidationService: AppInputValidationService) {
  const dto = NewDepartmentDtoExtensions.fromRecord(formData.value as Record)
  let errors: ValidationError[]

  try {
    // Se tuvo que poner el "new NewDepartmentDto" porque si no, el metodo "validate" no lo identifica como un objeto de tipo "NewDepartmentDto"
    errors = await validate(new NewDepartmentDto({ key: dto.key, name: dto.name }))
  } catch (error) {
    console.error('Something went wrong during the validations: ', error)
  }

  const dtoValidated: AppInputValidationModel = appInputValidationService.validateDtoRules(errors)

  dtoValidations.value = dtoValidated
}

/*
 * Metodos del "Service"
 */
export async function useSaveRecord(
  appInputValidationService: AppInputValidationService,
  deparmentService: IDeparmentContract,
) {
  await useInitValidations(appInputValidationService)

  const isValid = dtoValidations.value.isValid

  if (isValid) {
    const body = NewDepartmentDtoExtensions.fromRecord(formData.value as Record)

    if (editMode.value && formData.value.id) {
      const index = rows.value.findIndex((r) => r.id === formData.value.id)

      if (index !== -1) {
        /*
         * Version Hardcodeada
         * Logica previa del "Presenter"
         */
        // rows.value[index] = {
        //   ...formData.value,
        //   updatedAt: new Date().toISOString(),
        // } as Record

        /*
         * Version completa (sin hardcode)
         */
        // -------------------------------------------------------------
        // Agregar aqui la logica para implementar el "update" en la BD
        /*
         * Metodos del "Service"
         */
        let dismiss: (props?: QNotifyUpdateOptions) => void

        try {
          dismiss = Notify.create({
            spinner: true,
            type: 'info',
            message: 'Loading...',
            position: 'top-right',
            timeout: 0,
          })

          const res = await deparmentService.updateDepartmentById(formData.value.id, body)
          console.info('Resultado del API - deparmentService.updateDepartmentById: ', res)

          // Nuevo valor en el "Presenter"
          rows.value[index] = GetDepartmentDtoExtensions.toRecord(res)
        } catch (error) {
          console.error(
            'department.composables.ts - deparmentService.updateDepartmentById: ',
            error,
          )

          Notify.create({
            type: 'negative',
            message: 'Please contact the software team',
            position: 'top-right',
            timeout: 5000,
          })
        } finally {
          dismiss()
        }
        // -------------------------------------------------------------
      }
    } else {
      /*
       * Version Hardcodeada
       * Logica previa del "Presenter"
       */
      // rows.value.push({
      //   id: Date.now(),
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      //   key: formData.value.key,
      //   name: formData.value.name,
      //   description: formData.value.description,
      // })

      /*
       * Version completa (sin hardcode)
       */
      // -------------------------------------------------------------
      // Agregar aqui la logica para implementar el "create" en la BD
      let dismiss: (props?: QNotifyUpdateOptions) => void

      try {
        dismiss = Notify.create({
          spinner: true,
          type: 'info',
          message: 'Loading...',
          position: 'top-right',
          timeout: 0,
        })

        const res = await deparmentService.createDepartment(body)
        console.info('Resultado del API - deparmentService.createDepartment: ', res)

        // Nuevo valor en el "Presenter"
        const newVal = GetDepartmentDtoExtensions.toRecord(res)

        rows.value.push(newVal)
        // rows.value.push({
        //   id: newVal.id,
        //   createdAt: newVal.createdAt,
        //   updatedAt: newVal.updatedAt,
        //   key: newVal.key,
        //   name: newVal.name,
        //   description: newVal.description,
        // })
      } catch (error) {
        console.error('department.composables.ts - deparmentService.createDepartment: ', error)

        Notify.create({
          type: 'negative',
          message: 'Please contact the software team',
          position: 'top-right',
          timeout: 5000,
        })
      } finally {
        dismiss()
      }
      // -------------------------------------------------------------
    }

    isDialogEditAddOpen.value = false
  }
}

export async function useDeleteRecord(deparmentService: IDeparmentContract) {
  /*
   * Version Hardcodeada
   * Logica previa del "Presenter"
   */
  // const id = idDeleteRecord.value

  // rows.value = rows.value.filter((r) => r.id !== id)

  // isDialogDeleteOpen.value = false

  /*
   * Version completa (sin hardcode)
   */
  // -------------------------------------------------------------
  // Agregar aqui la logica para implementar el "delete" en la BD
  const id = idDeleteRecord.value
  let dismiss: (props?: QNotifyUpdateOptions) => void

  try {
    dismiss = Notify.create({
      spinner: true,
      type: 'info',
      message: 'Loading...',
      position: 'top-right',
      timeout: 0,
    })

    const res = await deparmentService.deleteDepartmentById(id)
    console.info('Resultado del API - deparmentService.deleteDepartmentById: ', res)

    // Nuevo valor en el "Presenter"
    const newVal = GetDepartmentDtoExtensions.toRecord(res)

    rows.value = rows.value.filter((r) => r.id !== newVal.id)

    isDialogDeleteOpen.value = false
  } catch (error) {
    console.error('department.composables.ts - deparmentService.deleteDepartmentById: ', error)

    Notify.create({
      type: 'negative',
      message: 'Please contact the software team',
      position: 'top-right',
      timeout: 5000,
    })
  } finally {
    dismiss()
  }
  // -------------------------------------------------------------
}
