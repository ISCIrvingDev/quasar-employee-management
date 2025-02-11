/*
 * Modelos & Columnas del Data Table
 */
import type { Record } from './deparment.models'

/*
 * Vue Reactivity
 */
import { ref } from 'vue'

/*
 * Variables
 */
// Valor del "mode": "edit" || "new"
const editMode = ref(false)

// Valor del registro actual seleccionado (ya sea en "edit" o en "new")
const formData = ref<Partial<Record>>({})

// Todos los registros de la tabla
const records = ref<Record[]>([])

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
export function useInit() {
  console.log('URL del API: ', process.env.API_BASE_URL)

  return {
    editMode,
    formData,
    records,
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
    const index = records.value.findIndex((r) => r.id === formData.value.id)

    if (index !== -1) {
      records.value[index] = {
        ...formData.value,
        updatedAt: new Date().toISOString(),
      } as Record
    }
  } else {
    records.value.push({
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
  const id = idDeleteRecord.value

  records.value = records.value.filter((r) => r.id !== id)

  isDialogDeleteOpen.value = false
}
