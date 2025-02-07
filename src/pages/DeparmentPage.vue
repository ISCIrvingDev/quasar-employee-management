<template>
  <q-page padding>
    <q-card class="page-height">
      <q-card-section class="bg-primary-gradient text-accent">
        <div class="text-h5">{{ title }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn
          color="secondary"
          text-color="secondary"
          outline
          label="Add Record"
          @click="openDialogEditAdd()"
        />
      </q-card-section>

      <q-card-section>
        <!-- https://quasar.dev/vue-components/table#styling
        https://quasar.dev/style/color-palette#color-list -->
        <q-table
          :rows="records"
          :columns="columns"
          separator="cell"
          row-key="id"
          color="accent"
          table-class="text-grey-8 bg-white"
          table-header-class="bg-primary-gradient text-accent"
          title="Department records"
          card-class="bg-primary-gradient text-accent"
        >
          <template v-slot:body-cell-actions="props">
            <q-td class="text-center">
              <q-btn
                color="secondary"
                flat
                round
                dense
                icon="description"
                @click="openDialogDetails(props.row)"
              />
              <q-btn
                color="secondary"
                flat
                round
                dense
                icon="edit"
                @click="openDialogEditAdd(props.row)"
              />
              <q-btn
                color="negative"
                flat
                round
                dense
                icon="delete"
                @click="openDialogDelete(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Dialogo para formulario Details -->
    <q-dialog v-model="isDialogOpenDetails">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Record Details</div>
        </q-card-section>

        <q-card-section>
          <q-form>
            <q-input v-model="formData.key" label="Key" required readonly />
            <q-input v-model="formData.name" label="Name" required readonly />
            <q-input
              v-model="formData.description"
              label="Description"
              type="textarea"
              required
              readonly
            />
            <div class="q-mt-md">
              <q-btn color="primary" label="Close" @click="isDialogOpenDetails = false" outline />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialogo para formulario Edit/Add -->
    <q-dialog v-model="isDialogEditAddOpen">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Edit Record' : 'Add Record' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="saveRecord">
            <q-input v-model="formData.key" label="Key" required />
            <q-input v-model="formData.name" label="Name" required />
            <q-input v-model="formData.description" label="Description" type="textarea" required />
            <div class="q-mt-md">
              <q-btn type="submit" color="primary" label="Guardar" outline />
              <q-btn
                color="negative"
                label="Cancelar"
                flat
                @click="isDialogEditAddOpen = false"
                class="q-ml-md"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialogo para confirmar Delete -->
    <q-dialog v-model="isDialogDeleteOpen">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Record</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="deleteRecord">
            <div>Delete record with ID: {{ idDeleteRecord }}?</div>

            <div class="q-mt-md">
              <q-btn color="primary" label="Cancel" outline @click="isDialogDeleteOpen = false" />
              <q-btn type="submit" color="negative" label="Delete" flat class="q-ml-md" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { QTableProps } from 'quasar'

console.log('URL del API: ', process.env.API_BASE_URL)

const route = useRoute()

// Modelos
interface Record {
  id: number
  createdAt: string
  updatedAt: string
  key: string
  name: string
  description: string
}

// Titulo de la "Page"
const title = computed(() => (route.meta.title as string) || 'Employee Management')

// Todos los registros de la tabla
const records = ref<Record[]>([])

// Valor del modal Edit/Add
const isDialogEditAddOpen = ref(false)

// Valor del modal Details
const isDialogOpenDetails = ref(false)

// Valor del modal Delete
const isDialogDeleteOpen = ref(false)

// Valor del "mode": "edit" || "new"
const editMode = ref(false)

// Valor del registro actual seleccionado (ya sea en "edit" o en "new")
const formData = ref<Partial<Record>>({})

// Valor del registro actual seleccionado (ya sea en "edit" o en "new")
const idDeleteRecord = ref<number>(0)

// Columnas del Data Table
const columns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
    classes: 'trunc-text max-col-width',
  },
  {
    name: 'createdAt',
    label: 'Created At',
    field: 'createdAt',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    field: 'updatedAt',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'key',
    label: 'Key',
    field: 'key',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
    classes: 'trunc-text max-col-width',
    sortable: true,
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'center',
    classes: 'trunc-text max-col-width',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
    classes: 'trunc-text max-col-width',
  },
]

// Dialog Edit/Add Handler
const openDialogEditAdd = (record?: Record) => {
  editMode.value = !!record // Si hay "record", editMode es true (edit mode), de lo contrario es false (new mode)
  formData.value = record ? { ...record } : { key: '', name: '', description: '' } // Si hay "record", registra los nuevos valores (edit mode), de lo contrario todos los valores son reseteados con su valor por defecto (new mode)
  isDialogEditAddOpen.value = true // Modal abierto
}

// Dialog Details Handler
const openDialogDetails = (record?: Record) => {
  formData.value = record // { ...record }
  isDialogOpenDetails.value = true // Modal abierto
}

// Dialog Delete Handler
const openDialogDelete = (id: number) => {
  isDialogDeleteOpen.value = true // Modal abierto

  idDeleteRecord.value = id
}

// Metodos del "Presenter"
const saveRecord = () => {
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

const deleteRecord = () => {
  const id = idDeleteRecord.value

  records.value = records.value.filter((r) => r.id !== id)

  isDialogDeleteOpen.value = false
}
</script>

<style lang="scss" scoped></style>
