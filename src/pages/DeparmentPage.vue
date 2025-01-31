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
          @click="openDialog()"
        />
      </q-card-section>

      <q-card-section>
        <!-- https://quasar.dev/vue-components/table#styling
        https://quasar.dev/style/color-palette#color-list -->
        <q-table
          :rows="records"
          :columns="columns"
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
                @click="openDialog(props.row)"
              />
              <q-btn
                color="secondary"
                flat
                round
                dense
                icon="edit"
                @click="openDialog(props.row)"
              />
              <q-btn
                color="negative"
                flat
                round
                dense
                icon="delete"
                @click="deleteRecord(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Dialogo para formulario -->
    <q-dialog v-model="isDialogOpen">
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
              <q-btn type="submit" color="primary" label="Guardar" />
              <q-btn
                color="negative"
                label="Cancelar"
                flat
                @click="isDialogOpen = false"
                class="q-ml-md"
              />
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

// Valor del modal
const isDialogOpen = ref(false)

// Valor del "mode": "edit" || "new"
const editMode = ref(false)

// Valor del registro actual seleccionado (ya sea en "edit" o en "new")
const formData = ref<Partial<Record>>({})

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

// Dialog Handler
const openDialog = (record?: Record) => {
  editMode.value = !!record // Si hay "record", editMode es true (edit mode), de lo contrario es false (new mode)
  formData.value = record ? { ...record } : { key: '', name: '', description: '' } // Si hay "record", registra los nuevos valores (edit mode), de lo contrario todos los valores son reseteados con su valor por defecto (new mode)
  isDialogOpen.value = true // Modal abierto
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

  isDialogOpen.value = false
}

const deleteRecord = (id: number) => {
  records.value = records.value.filter((r) => r.id !== id)
}
</script>

<style lang="scss" scoped></style>
