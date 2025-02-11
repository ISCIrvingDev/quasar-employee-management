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
      console.log('1) Resultado del API: ', res)

      rows.value = res.map((e) => {
        return NewDepartmentDtoExtensions.toRecord(e)
      })
    } catch (error) {
      console.error('department.composables.ts - deparmentService.getAllDepartments:')
      console.error(error)
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
 * Metodos del "Service"
 */
export function useSaveRecord() {
  if (editMode.value && formData.value.id) {
    const index = rows.value.findIndex((r) => r.id === formData.value.id)

    if (index !== -1) {
      // -------------------------------------------------------------
      // Agregar aqui la logica para implementar el "update" en la BD
      // -------------------------------------------------------------
      rows.value[index] = {
        ...formData.value,
        updatedAt: new Date().toISOString(),
      } as Record
    }
  } else {
    // -------------------------------------------------------------
    // Agregar aqui la logica para implementar el "create" en la BD
    // -------------------------------------------------------------
    rows.value.push({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      key: formData.value.key,
      name: formData.value.name,
      description: formData.value.description,
    })
  }

  isDialogEditAddOpen.value = false
}

export function useDeleteRecord() {
  // -------------------------------------------------------------
  // Agregar aqui la logica para implementar el "delete" en la BD
  // -------------------------------------------------------------
  const id = idDeleteRecord.value

  rows.value = rows.value.filter((r) => r.id !== id)

  isDialogDeleteOpen.value = false
}
