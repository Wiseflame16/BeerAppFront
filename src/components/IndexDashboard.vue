<template>
  <q-page>
    <div v-if="$q.platform.is.desktop">
      <h1 class="text-center">
        I'm only rendered on mobile!
      </h1>
    </div>
    <div v-if="$q.platform.is.mobile">
      <div class="column wrap full-width bg-grey-10 " style="height:92.9vh">
        <h5 class="text-center TitlePrincipal">Dashboard</h5>
      <div class="row justify-evenly">
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section class="text-center">
            <div class="text-h6">Cervezas</div>
            <div class="text-subtitle3">Cantidad Registradas</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              {{ TCervezas }}
            </div>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section class="text-center">
            <div class="text-h6">Cervecerías</div>
            <div class="text-subtitle2">Cervecerías Registradas</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section >
            <div class="column justify-center text-center">
              {{ TBreweries }}
            </div>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section class="text-center">
            <div class="text-h6 ">Estilos</div>
            <div class="text-subtitle3">Estilos <br>Registrados</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              {{ TType }}
            </div>
          </q-card-section>
        </q-card>
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section class="text-center">
            <div class="text-h6">Nuevos Post</div>
            <div class="text-subtitle3">Solicitudes pendientes</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section>
            <div class="column justify-center text-center">
              por definir
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'
export default {
  setup () {
    const TCervezas = ref(null)
    const TBreweries = ref(null)
    const TType = ref(null)
    function getData () {
      api
        .get('api/v1/beer').then(res => {
          TCervezas.value = res.data.length
        }).catch(err => {
          console.log(err)
        })
      api
        .get('api/v1/brand').then(res => {
          TBreweries.value = res.data.length
        }).catch(err => {
          console.log(err)
        })
      api
        .get('api/v1/type').then(res => {
          TType.value = res.data.length
        }).catch(err => {
          console.log(err)
        })
      api
        .get('public/Banners_Cervezas-1671720999585.jpeg').then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }
    return {
      TCervezas,
      TBreweries,
      TType,
      getData
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 45vw;
  margin: 15px 0;
}
.TitlePrincipal{
  background-image: url('http://localhost:5000/public/Banners_Cervezas-1671720999585.jpeg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 120px;
  margin:0;
  font-size: 50px;
  padding: 30px;
  color: #FFAB00;
  -webkit-text-stroke: 1px #583c04;
}
</style>
