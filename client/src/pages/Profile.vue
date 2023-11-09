<script lang="ts">

import PageLayout from "../components/PageLayout.vue";
import Container from "../components/Container.vue";
import DishesList from "../components/DishesList.vue";
import CategoriesList from "../components/CateogoriesList.vue";
export default {
  name:"Profile",
  components:{CategoriesList, DishesList, PageLayout,Container},
  data(){
    return {
      tabs:[
        {
          name:"Блюда",
          active:true
        },
        {
          name:"Категории",
          active:false
        },
      ]
    }

  },
  computed:{
    isCategoryShow(){
      return this.tabs[1].active
    }
  },
  methods:{
    tabClick(id){
      this.tabs.forEach((el,idx)=>{

        el.active = idx == id;

      })

    }
  }
}
</script>

<template>
  <PageLayout>
    <Container>

      <div class="profile-select">
        <p v-for="(el,id) in tabs" @click="()=>tabClick(id)" :class="{'active':el.active}">{{ el.name }}</p>

      </div>
      <transition name="fade" mode="out-in">
        <CategoriesList v-if="isCategoryShow"/>
        <DishesList v-else/>

      </transition>

    </Container>
  </PageLayout>
</template>

<style scoped lang="scss">
  .profile-select{
    display: flex;
    align-items: center;

    gap: 20px;
    margin: 20px 0px;
    p{
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      display: block;
      padding: 5px 15px;
      color: #0f56b1;
      border-radius: 5px;
      border: 1px solid #0f56b1;
      &.active{
        background-color: #0f56b1;
        color: #fff;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
</style>