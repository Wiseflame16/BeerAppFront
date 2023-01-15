<template>
 <q-page class="bg-grey-10">
  <q-table

      color="white"
      grid-header
      card-class="bg-grey-10 text-white"
      title="Todas"
      table-header-class="text-white"
      title-class="text-white"
      :rows="this.rows"
      :columns="this.columns"
      row-key="name"
      :filter="filter"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input borderless debounce="300" v-model="filter" placeholder="Buscar" input-class="text-white">
          <template v-slot:append>
            <q-icon name="search" color="white"/>
          </template>
        </q-input>
      </template>

        <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="BeerId" :props="props">{{ props.row.BeerId }}</q-td>
          <q-td key="BeerName" :props="props">{{ props.row.BeerName }}</q-td>
          <q-td key="Brand" :props="props">{{ props.row.Brand }}</q-td>
          <q-td key="Type" :props="props">{{ props.row.Type }}</q-td>
          <q-td key="Abv" :props="props">{{ props.row.Abv }}</q-td>
          <q-td key="Ibu" :props="props">{{ props.row.Ibu }}</q-td>
          <q-td key="Srm" :props="props">{{ props.row.Srm }}</q-td>
          <q-td key="Upc" :props="props">{{ props.row.Upc }}</q-td>
          <q-td key="LastModif" :props="props">{{ props.row.LastModif }}</q-td>
          <q-td key="ImageFile" :props="props">
          <q-btn
            text-color="white"
            color="primary"
            label="Ver Cerveza"
            no-caps
            dense
            :to="'repositorio/'+props.row.BeerId" exact
            />
          </q-td>
        </q-tr>
      </template>
      <!-- <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.85);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'name')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template> -->
    </q-table>
 </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const columns = ref([
  { name: 'BeerId', label: 'Id Cerveza', field: 'BeerId', align: 'center', sortable: true, required: true },
  { name: 'BeerName', label: 'Nombre', field: 'BeerName', align: 'center', sortable: true },
  { name: 'Brand', label: 'Marca', field: 'Brand', align: 'center', sortable: true },
  { name: 'Type', label: 'Tipo', field: 'Type', align: 'center', sortable: true },
  { name: 'Abv', label: 'Abv', field: 'Abv', align: 'center', sortable: true },
  { name: 'Ibu', label: 'Ibu', field: 'Ibu', align: 'center' },
  { name: 'Srm', label: 'Srm', field: 'Srm', align: 'center' },
  { name: 'Upc', label: 'Upc', field: 'Upc', align: 'center' },
  { name: 'LastModif', label: 'Ultima Modif', field: 'LastModif', align: 'center' },
  { name: 'ImageFile', label: 'Accion', field: 'ImageFile' }
])
const rows = ref([])
const $q = useQuasar()
export default {
  setup () {
    function getData () {
      api
        .get('api/v1/beer').then(res => {
          console.log(res.data)
          rows.value = res.data
        }).catch(err => {
          console.log(err)
          $q.notify({
            message: err.data.message,
            type: 'negative'
          })
        })
    }
    return {
      rows,
      showPopup: ref(false),
      columns,
      filter: ref(''),
      getData
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
