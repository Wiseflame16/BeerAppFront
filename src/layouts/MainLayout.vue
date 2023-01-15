<template>
  <q-layout view="hHh Lpr lFr">
    <q-header reveal bordered class="text-white bg-grey-10" >
      <q-toolbar>
        <q-btn dense flat round icon="menu" color="amber-14" @click="toggleLeftDrawer"/>

        <q-toolbar-title class="text-center">
          <a href="/inicio" class="text-amber-14" style="text-decoration:none;">
              Repository Beer
          </a>
        </q-toolbar-title>
        <q-avatar>
            <q-btn round push color="amber-14" to="/cuenta" icon="sports_bar" />
          </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile">
      <q-scroll-area class="fit bg-grey-10"  >
          <q-list padding class="menu-list text-white" >
            <q-item clickable v-ripple :active="link === '/inicio'" @click="link = '/inicio'" active-class="my-menu-link" to='/inicio' exact>
              <q-item-section avatar>
                <q-icon name="space_dashboard" />
              </q-item-section>
              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="link === '/lista'" @click="link = '/lista'" active-class="my-menu-link" to='/lista' exact>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Ver Listado
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="link === '/administrar'" @click="link = '/administrar'" active-class="my-menu-link" to='/administrar' exact>
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section>
                Administrar
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="link === '/propuesta'" @click="link = '/propuesta'" active-class="my-menu-link" to='/propuesta' exact>
              <q-item-section avatar>
                <q-icon name="markunread_mailbox" />
              </q-item-section>
              <q-item-section>
                Propuestas
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="link === '/configuracion'" @click="link = '/configuracion'" active-class="my-menu-link" to='/configuracion' exact>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                Configuración
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="link === '/cuenta'" @click="link = '/cuenta'" active-class="my-menu-link" to='/cuenta' exact>
              <q-item-section avatar>
                <q-icon name="admin_panel_settings" />
              </q-item-section>
              <q-item-section>
                Cuenta
              </q-item-section>
            </q-item>
            <q-separator color="amber-14"/>
            <q-item clickable v-ripple :active="link === '/salir'" @click="link = '/salir'" active-class="my-menu-link" to='/salir' exact>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>
              <q-item-section>
                Salir
              </q-item-section>
            </q-item>
          </q-list>
          <div class="absolute-bottom q-mb-xl q-ml-xl" >
            <p class="text-white">Desarrollado por "El Tio Wise"</p>
            <p class="text-white">Herramientas Utilizadas</p>
            <q-avatar>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png">
            </q-avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
            </q-avatar>
            <q-avatar>
              <img src=" https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png">
            </q-avatar>
          </div>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
    const leftDrawerOpen = ref(false)
    const link = route.path

    return {
      route,
      link,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
<style scoped>
  .my-menu-link {
    color: black;
    background: #FFAB00;
  }
</style>
