<script lang="ts">

import Container from "./Container.vue";
import {onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import {useStore} from "vuex";
import AddItem from "./AddItem.vue";
import {Field, Form} from "vee-validate";
import * as yup from "yup";
import {mixed, number, string} from "yup";
export default {
  name:"DishesList",

  components:{
    AddItem,
    Container,
    Form,
    Field
  },
  setup() {
    const store = useStore()
    const dishes = ref([]);
    const isLoading = ref(true);
    const isAuth = ref(false)
    const openForm = ref(false)
    const categories = ref([])
    const selectValue = ref('')
    const getDishes =  ()=>{
      store.dispatch('fetchDishes')
          .then(res=> {
            dishes.value = store.state.dishes
            isAuth.value=store.getters.getAuth
            dishes.value.forEach(el=>{
              el.showForm = false
            })
          })

    }
    const openSettingsHandler = (id) => {
      dishes.value.forEach((el,idx)=>{
        el.showForm = false
        if(id === idx) {
          el.showForm = true
        }
      })
    }
    const closeSettingsHandler = (id) => {
      dishes.value.forEach((el,idx)=>{
        if(id === idx) {
          el.showForm = false
        }
      })
    }
    const getCategories =() =>{
      store.dispatch('fetchCategories')
          .then(()=>{
            categories.value = store.state.categories
            selectValue.value = categories.value[0].name
          })
    }
    const dishesSchema = yup.object({
      name:string().required('Это поле обязательно'),
      price:number()
          .typeError('Введите цену правильно')
          .required('Это поле обязательно')
          .positive('Цена должна быть положительной')
          .test('is-decimal', 'Цена должна иметь не более двух знаков после запятой', value => {
            if (value === undefined || value === null) return true;
            return (/^\d+(\.\d{1,2})?$/).test(value);
          }),
      avatar:mixed()
          .test('file-type', 'Загрузите фото в формате .png или .jpg', (value) => {
            if (!value) return true;
            if (value.type === 'image/png' || value.type === 'image/jpeg') {
              return true;
            }
            return false;
          })
          .required('Это поле обязательно')
    })
    const deleteHandler = (id) =>{
      store.dispatch('deleteDish',id)
    }
    onMounted(()=>{
      getDishes()
      getCategories()
    })
    const changeSubmit = (values) => {
      const {dishId} = values
      const obj = {
        avatar:values.avatar,
        categoryId:values.categoryId,
        name:values.name,
        price:values.price
      }
      store.dispatch('updateDish',{values:obj,id:dishId})
    }
    onBeforeUpdate(()=>{
      console.log("Before Update!!!")
    })
    onUpdated(()=>{
      dishes.value=store.state.dishes
    })
    return{
      openSettingsHandler,
      closeSettingsHandler,
      openForm,
      dishes,
      categories,
      isLoading,
      isAuth,
      selectValue,
      dishesSchema,
      changeSubmit,
      deleteHandler
    }
  },


}
</script>

<template>
  <Container>
    <div class="dishes__row">
      <div v-for="(dish,id) in dishes" class="dish-card" :key="id">
        <div class="dish-card__settings" v-if="isAuth">
          <img @click="() =>openSettingsHandler(id)" src="/public/settings.png" width="15" height="15" alt="">
          <img @click="() =>deleteHandler(dish.id)" src="/public/close-icon.png" width="15" height="15" alt="">
        </div>
        <Form v-if="dish.showForm" @submit="changeSubmit" class="dish-card__form">
          <Field type="hidden" :value="dish.id" name="dishId"/>

          <Field v-model="dish.name" placeholder="Введите название" name="name" type="text" class="dish-card__input"/>
          <ErrorMessage name="name"/>
          <Field v-model="dish.price" placeholder="Введите цену" name="price" type="text" class="dish-card__input"/>
          <ErrorMessage name="price"/>
          <Field v-model="selectValue" as="select" name="categoryId">
            <option  :value="el.id" :name="el.name" v-for="(el,id) in categories">{{ el.name }}</option>
          </Field>
          <Field v-model="dish.avatar" name="avatar" type="file"/>
          <ErrorMessage name="avatar"/>
          <div class="dish-card__buttons">
            <button type="submit"  class="button-fill">Отправить</button>
            <button @click="() =>closeSettingsHandler(id)" class="button-fill bgc-red">Отмена</button>
          </div>
        </Form>

        <div v-else class="dish-card__content">
          <img :src="dish.avatar" class="dish-card__image" alt="">
          <p class="dish-card__text text-center">{{dish.name}}</p>
          <h4 class="title_h4 text-center dish-card__price">{{dish.price}} р</h4>
        </div>

      </div>
    <AddItem v-if="isAuth && this.$router.currentRoute.value.name==='Profile'"/>
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
  position: relative;
  &__form{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__buttons{
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: stretch;
    button {
      max-width: 100%;
      text-align: center;
    }
  }
  &__input{
    padding: 5px;
    border: 1px solid #7a7272;
    border-radius: 5px;
    outline: none;
  }
  &__settings{
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 5px;
    border-radius: 20px;
    top: -10px;
    right: -5px;
    position: absolute;
    border:1px solid #7a7272;
    z-index: 150;
  }
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
    max-height: 160px;
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