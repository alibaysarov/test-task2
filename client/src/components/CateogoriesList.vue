<script lang="ts">

import Container from "./Container.vue";
import { onMounted, ref} from "vue";
import {useStore} from "vuex";
import AddItem from "./AddItem.vue";
import * as yup from "yup";
import {mixed, number, string} from "yup";

export default {
  name:"CategoriesList",

  components:{
    AddItem,
    Container
  },
  setup() {
    const store = useStore()
    const categories = ref([]);
    const isAuth=ref(false)
    const isLoading = ref(true);
    const getCategories =  ()=>{
      store.dispatch('fetchCategories')
          .then(res=> {
            categories.value = store.state.categories
            isAuth.value=store.getters.getAuth

            categories.value.forEach(el=>{
              el.avatar =`http://localhost:3000/${el.avatar}`
            })
          })

    }

    onMounted(getCategories)
    return{
      categories,
      isLoading,
      isAuth,
    }
  },


}
</script>

<template>
  <Container>
    <div class="dishes__row">
      <div v-for="(category,id) in categories" class="dish-card" :key="id">
        <img :src="category.avatar" class="dish-card__image" alt="">
        <h4 class="title_h4 text-center dish-card__price">{{category.name}}</h4>
      </div>
      <AddItem v-if="isAuth && this.$router.currentRoute.value.name==='Profile'" type="category"/>
    </div>
  </Container>
</template>

<style lang="scss">
.dishes{
  &__row{
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 20px;
  }
}
.dish-card{
  width: 30%;
  padding: 15px 10px;
  border-radius: 10px;
  border:1px solid #7a7272;
  cursor: pointer;
  &:hover{
    box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.45);
    transform: translateY(-2px);
  }
  &__image{
    width: 100%;
    max-width: 100%;
    max-height: 200px;
    height: auto;
    object-position: center;
    object-fit: cover;
  }
  &__text{
    margin-top: 10px;
    font-size: 19px;
    color: #7a7272;
  }
  &__price{
    margin-top: 10px;
  }
}
</style>