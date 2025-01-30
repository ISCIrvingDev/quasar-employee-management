<template>
  <q-page padding>
    <q-card class="page-height">
      <q-card-section>
        <div class="text-h5">{{ title }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn color="primary" label="Add Record" @click="openDialog()" />
      </q-card-section>

      <q-card-section>
        <q-table :rows="records" :columns="columns" row-key="id">
          <template v-slot:body-cell-actions="props">
            <q-td class="text-center">
              <q-btn color="primary" flat dense icon="edit" @click="openDialog(props.row)" />
              <q-btn
                color="negative"
                flat
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

interface Record {
  id: number
  createdAt: string
  updatedAt: string
  key: string
  name: string
  description: string
}

const route = useRoute()

const title = computed(() => (route.meta.title as string) || 'Default Title')

const records = ref<Record[]>([])
const isDialogOpen = ref(false)
const editMode = ref(false)
const formData = ref<Partial<Record>>({})

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'ID', field: 'id', align: 'center', sortable: true },
  { name: 'createdAt', label: 'Created At', field: 'createdAt', align: 'center', sortable: true },
  { name: 'updatedAt', label: 'Updated At', field: 'updatedAt', align: 'center', sortable: true },
  { name: 'key', label: 'Key', field: 'key', align: 'center', sortable: true },
  { name: 'name', label: 'Name', field: 'name', align: 'center', sortable: true },
  { name: 'description', label: 'Description', field: 'description', align: 'center' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
]

const openDialog = (record?: Record) => {
  editMode.value = !!record
  formData.value = record ? { ...record } : { key: '', name: '', description: '' }
  isDialogOpen.value = true
}

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

<style lang="scss" scoped>
.q-table {
  thead {
    background-color: red;
    color: white;
  }
}
// .q-table thead {
//   background-color: red;
//   color: white;
// }
</style>
