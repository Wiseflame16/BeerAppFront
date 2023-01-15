<template>
  <q-page class="bg-grey-10">
    <q-img
      :src="imagen"
      spinner-color="primary"
      spinner-size="82px"
    >
      <q-icon class="absolute all-pointer-events" size="64px" name="star" color="amber" style="top: 20px; right: 20px">
      </q-icon>
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-red">
          Esta cerveza no cuenta con imagen
        </div>
      </template>
    </q-img>
    <q-img
      src="https://marcas-odoo.s3.us-east-2.amazonaws.com/RoyalGuard.png"
      class="absolute" style="top: 20px; left: 10px; height: 90px; max-width: 90px;">
    </q-img>
    <q-banner class="bg-primary text-white text-center">
      {{ cerveza.BeerDescription }}
    </q-banner>
    <div class="bg-grey-10">

      <q-markup-table :separator="separator"  bordered class="q-mx-md ">
        <tbody>
          <tr>
            <td class="text-center">Marca</td>
            <td class="text-center">{{ marca }}</td>
          </tr>
          <tr>
            <td class="text-center">Estilo </td>
            <td class="text-center">{{ Tipo }}</td>
          </tr>
          <tr>
            <td class="text-center">Abv</td>
            <td class="text-center">{{ cerveza.Abv }}</td>
          </tr>
          <tr>
          <td class="text-center">Ibu</td>
          <td class="text-center">{{ cerveza.Ibu }}</td>
        </tr>
        <tr>
          <td class="text-center">Srm</td>
          <td class="text-center">{{ cerveza.Srm}}</td>
        </tr>
        <tr>
          <th class="text-center">Upc</th>
          <th class="text-center">{{ cerveza.Upc }}</th>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
    <q-banner class="bg-grey-10 text-white text-center">
      <div class="column content-center">
        Mi valoración!
        <q-rating class="row content-center q-mx-auto"
        v-model="ratingModel"
        size="3.5em"
        color="amber-8"
        readonly
        icon="star_border"
        icon-selected="star">
      </q-rating>
    </div>
    </q-banner>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {

  setup () {
    const route = useRoute()
    const cerveza = ref({
      Brand: '',
      Type: '',
      Abv: '',
      Ibu: '',
      Srm: '',
      Upc: '',
      BeerDescription: '',
      BeerId: '',
      ImageFile: '',
      LastModif: ''
    })
    const entryData = ref({
      Brewery: '',
      Types: ''
    })
    const imagen = ref(null)
    const marca = ref('')
    const Tipo = ref('')
    function getData () {
      const id = route.params.BeerId
      api
        .get('api/v1/beer/' + id)
        .then(res => {
          cerveza.value = res.data[0]
          imagen.value = res.data[0].ImageFile
          marca.value = res.data[0].Brand
          Tipo.value = res.data[0].Type
          getBrand(marca.value)
          getType(Tipo.value)
        })
    }
    function getBrand (e) {
      api
        .get('api/v1/brand/' + e)
        .then(res => {
          entryData.value.Brewery = res.data
          marca.value = res.data[0].BrandName
        })
    }
    function getType (f) {
      api
        .get('api/v1/type/' + f)
        .then(res => {
          entryData.value.Types = res.data
          Tipo.value = res.data[0].TypeName
        })
    }
    return {
      cerveza,
      imagen,
      marca,
      Tipo,
      getData,
      entryData,
      separator: ref('cell'),
      ratingModel: ref(5),
      getBrand,
      getType
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>

</style>
