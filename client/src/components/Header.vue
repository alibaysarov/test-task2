<script setup lang="ts">
import api from "../api";
import {useStore} from "vuex";
import {onBeforeMount, onMounted, onUpdated, ref, watch} from "vue";

const user =ref({})
const isAuth =ref(false)
const store=useStore()
const getUser=async ()=>{
  store.dispatch('fetchUser').then(()=>{
    user.value = store.getters.getUser
    isAuth.value = store.getters.getAuth
  })
}
onMounted(getUser)
onUpdated(()=>{
  user.value = store.getters.getUser
  isAuth.value = store.getters.getAuth
})
</script>

<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">My Logo</div>
      <div class="header__title">
        <h2 class="title_h2 text-center">Мой ресторан</h2>
      </div>
      <div class="header__user" v-if="isAuth">
          <span @click="this.$router.push('/profile')">{{user.name}}</span>
      </div>
      <div class="header__auth" v-else>
        <button class="button-fill" @click="$router.push('/register')">Регистрация</button>
        <button class="button-stroke" @click="$router.push('/login')">Войти</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header{
  width: 100%;
  background-color: #fff;
  padding: 10px 5px;
  box-shadow: 0px 5px 5px 0px rgba(171,171,171,0.83);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 300;
  &__content{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__user {
    span{
      cursor: pointer;
    }
  }
  &__auth{
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>