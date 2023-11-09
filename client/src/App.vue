<script lang="ts">

import Header from "./components/Header.vue";
import Container from "./components/Container.vue";
import DishesList from "./components/DishesList.vue";
import {useStore} from "vuex";



export default {
  components: { Header},
  setup(){
    const store=useStore()
    store.dispatch('checkAuth')
    store.dispatch('fetchUser')
  },

}
</script>

<template>
  <Header/>
  <router-view v-slot="{Component}">
    <transition name="route" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  transform: translateY(100px)
}
.route-enter-active,
.route-leave-active {
  transition: all .2s ease-out
}
.route-leave-to {
  opacity: 0;
  transform: translateY(100px)
}
</style>
