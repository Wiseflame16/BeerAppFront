<template>
  <q-page class="bg-grey-10">
    <h5 class="text-center no-margin q-py-lg text-amber-14">General Options</h5>
    <div class="row justify-evenly">
      <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section class="text-center">
            <div class="text-h6">Create</div>
            <div class="text-subtitle3">Crea un nuevo Registro</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              <q-btn push @click="addRegister = true" class="text-subtitle3" label="Crear" icon-right="add" />
            </div>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6 text-center">Leer</div>
            <div class="text-subtitle2 text-center">Busca un registro por su ID</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              <q-btn push  to="" class="text-subtitle3" icon-right="search" label="Buscar" />
            </div>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6 text-center">Editar</div>
            <div class="text-subtitle3 text-center">Edita un registro por su ID</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              <q-btn push  to="" class="text-subtitle3" icon-right="edit" label="Editar" />
            </div>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6">Eliminar</div>
            <div class="text-subtitle3">Elimina un registro por su ID</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              <q-btn push  to="" class="text-subtitle3" icon-right="delete" label="Borrar" />
            </div>
          </q-card-section>
        </q-card>
      </div>
  </q-page>
  <q-dialog v-model="addRegister" persistent >
      <q-card>
        <q-card-section class="bg-grey-10">
          <div class="row justify-between content-center items-center">
            <p class="text-h6 text-center text-white no-margin">Crear Registro</p>
            <q-btn round color="amber-14" icon="close" v-close-popup/>
          </div>
        </q-card-section>

        <q-card-section class="no-padding">
          <q-tabs
            v-model="tab"
            dense
            align="justify"
            class="bg-grey-9 text-white shadow-2"
            :breakpoint="0"
          >
            <q-tab name="Beer" icon="sports_bar" />
            <q-tab name="Bread" icon="factory" />
            <q-tab name="Type" icon="alarm" />
          </q-tabs>
        </q-card-section>
        <q-card-section style="max-height: 62vh" class="scroll">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Beer">
              <div class="text-center">Crea una cerveza</div>
              <q-form
              @submit="registerBeer"
                class="q-gutter-md"
              >
                <q-input
                  outlined
                  v-model="Beer.BeerName"
                  label="Nombre"
                />
                <q-select
                  outlined
                  v-model="Beer.Brand"
                  :options="entryData.brewerys"
                  options-cover
                  behavior="menu"
                  emit-value
                  map-options
                  label="Marca"
                />
                <q-select
                  outlined
                  v-model="Beer.Type"
                  :options="entryData.Types"
                  options-cover
                  behavior="menu"
                  emit-value
                  map-options
                  label="Tipo"
                />
                <q-input
                  outlined
                  v-model="Beer.Abv"
                  label="Abv"
                />
                <q-input
                  outlined
                  v-model="Beer.Ibu"
                  label="Ibu"
                />
                <q-input
                  outlined
                  v-model="Beer.Srm"
                  label="Srm"
                />
                <q-input
                  outlined
                  v-model="Beer.Upc"
                  label="Upc"
                />
                <q-input
                  outlined
                  v-model="Beer.BeerDescription"
                  label="Descripción"
                />
                <q-file outlined v-model="Beer.ImageFile">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <q-card-actions align="center">
                  <q-btn label="Registrar" type="Submit" icon-right="sports_bar" color="primary"/>
                </q-card-actions>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="Bread">
              <div class="text-center">Crea una Marca</div>
              <q-form
                @submit="registerBrand"
                class="q-gutter-md"
              >
                <q-input
                  outlined
                  v-model="Brand"
                  clearable
                  clear-icon="close"
                  label="Registrar Marca"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Por favor,escribe algo']"
                />
                <q-card-actions align="center">
                  <q-btn label="Registrar" type="submit" icon-right="factory" color="primary" v-close-popup/>
                </q-card-actions>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="Type">
              <div class="text-center">Crea un Tipo</div>
              <q-form
                @submit="registerType"
                class="q-gutter-md"
              >
                <q-input
                  outlined
                  v-model="Type"
                  clearable
                  clear-icon="close"
                  label="Registrar Tipo"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Por favor,escribe algo']"
                />
                  <q-card-actions align="center">
                    <q-btn label="Registrar" type="submit" icon-right="alarm" color="primary" v-close-popup/>
                  </q-card-actions>
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      <q-separator />
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
export default {
  setup () {
    const $q = useQuasar()
    const Brand = ref(null)
    const Type = ref(null)
    const Beer = ref({
      BeerName: null,
      Brand: null,
      Type: null,
      Abv: null,
      Ibu: null,
      Srm: null,
      Upc: null,
      BeerDescription: null,
      ImageFile: null
    })
    const entryData = ref({
      brewerys: null,
      Types: null
    })
    function clear () {
      Brand.value = ''
      Type.value = ''
      Beer.value.BeerName = ''
      Beer.value.Brand = ''
      Beer.value.Type = ''
      Beer.value.Abv = ''
      Beer.value.Ibu = ''
      Beer.value.Srm = ''
      Beer.value.Upc = ''
      Beer.value.BeerDescription = ''
    }
    function registerBrand () {
      api
        .post('/api/v1/brand', { BrandName: Brand.value })
        .then((res) => {
          $q.notify({
            message: res.data.message,
            type: 'positive'
          })
          clear()
        })
        .catch((err) => {
          console.log(err)
          $q.notify({
            message: err.data.message,
            type: 'negative'
          })
          clear()
        })
    }
    function registerType () {
      api
        .post('/api/v1/type', { TypeName: Type.value })
        .then((res) => {
          $q.notify({
            message: res.data.message,
            type: 'positive'
          })
          clear()
        })
        .catch((err) => {
          console.log(err)
          $q.notify({
            message: err.message,
            type: 'negative'
          })
          clear()
        })
    }
    function registerBeer () {
      api
        .post('/api/v1/beer', { BeerName: Beer.value.BeerName, Brand: Beer.value.Brand, Type: Beer.value.Type, Abv: Beer.value.Abv, Ibu: Beer.value.Ibu, Srm: Beer.value.Srm, Upc: Beer.value.Upc, BeerDescription: Beer.value.BeerDescription, ImageFile: Beer.value.ImageFile })
        .then((res) => {
          console.log(res)
          $q.notify({
            message: res.data.message,
            type: 'positive'
          })
          clear()
        })
        .catch((err) => {
          console.log(err)
          $q.notify({
            message: err.message,
            type: 'negative'

          })
          clear()
        })
    }
    function getBeerStore () {
      api
        .get('/api/v1/brand')
        .then((res) => {
          entryData.value.brewerys = res.data.map((e) => {
            return { label: e.BrandName, value: e.BrandId }
          })
          console.log(entryData.value.brewerys)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .get('/api/v1/type')
        .then((res) => {
          console.log(res.data)
          entryData.value.Types = res.data.map((e) => {
            return { label: e.TypeName, value: e.TypeId }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return {
      addRegister: ref(false),
      tab: ref('Beer'),
      Brand,
      Type,
      Beer,
      entryData,
      clear,
      registerBrand,
      registerType,
      registerBeer,
      getBeerStore
    }
  },
  created () {
    this.getBeerStore()
  }
}
</script>
<style scoped>
.my-card{
  width: 100%;
  max-width: 45vw;
  margin: 15px 0;
}
</style>
