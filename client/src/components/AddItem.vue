<template>
  <div class="add-item">
    <img src="/public/close-icon.png" @click="showForm=false" v-if="showForm" class="add-item__close" width="30" height="30" alt="close-icon">
    <div class="add-item__content" v-if="!showForm">
      <img @click="toggleView" src="/public/plus.png" width="100" height="100" alt="" class="add-item__image">
      <h4>Добавить {{addTitle}}</h4>
    </div>
    <div  class="add-item__form form-category" v-else-if="type=='category'">
      <Form :validation-schema="categorySchema" class="add-item__fields" @submit="categoryFormSubmit">
        <Field name="name" placeholder="Введите имя категории"/>
        <ErrorMessage name="name" />
        <Field name="avatar" type="file" placeholder="Фото категории"/>
        <ErrorMessage name="avatar" />
        <button class="button-fill" type="submit">Создать</button>
      </Form>
    </div>
    <div class="add-item__form form-dishes" v-else>
      <Form :validation-schema="dishesSchema" class="add-item__fields" @submit="dishFormSubmit">
        <Field name="name"  placeholder="Введите имя блюда"/>
        <ErrorMessage name="name" />
        <Field  name="price" type="text"  placeholder="Введите цену блюда"/>
        <ErrorMessage name="price" />
        <Field name="avatar" type="file"  placeholder="Фото блюда"/>
        <ErrorMessage name="avatar" />
        <Field v-model="selectValue" @input="selectChangeHandler" as="select" name="categoryId">
          <option  :value="el.id" :name="el.name" v-for="(el,id) in categories">{{ el.name }}</option>
        </Field>
        <button class="button-fill" type="submit">Создать</button>
      </Form>
    </div>

  </div>
</template>
<script lang="ts">
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";
import {mixed, number, string} from "yup";
import {store} from "../store";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
export default {
  name:"AddItem",
  components:{Form,Field,ErrorMessage},
  props:{
    type:{
      default:'dish'
    }
  },
  data(){
    return{
      showForm:false,
    }
  },
  setup(){
    const store=useStore()
    const categorySchema = yup.object({
      name:string().required('Это поле обязательно'),
      avatar:mixed()
          .test('file-type', 'Загрузите фото в формате .png или .jpg', (value) => {
            if (!value) return true;
            if (value.type === 'image/png' || value.type === 'image/jpeg') {
              return true;
            }
            return false;
          })
          .required('Это поле обязательно')
    });
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
    const categories=ref([])
    const selectValue = ref('')
    const fetchCategories=()=>{
      console.log("Mounted")
      store.dispatch('fetchCategories')
          .then(r=>{
            categories.value=store.state.categories
            selectValue.value =  categories.value[0].name
          })
    }
    onMounted(fetchCategories)
    return{
      dishesSchema,
      categorySchema,
      categories,
      selectValue
    }
  },
  methods:{
    selectChangeHandler(e){
        console.log(e.target.value)

    },
    dishFormSubmit(values){
      console.log(values)
      store.dispatch('addDish',values)
    },
    categoryFormSubmit(values){
      console.log(values)
    },
    toggleView(){
      this.showForm=true
    },

  },
  computed:{
    addTitle(){
      return this.type === 'dish'?"Блюдо":"Категорию"
    }
  }
}
</script>

<style lang="scss">
  .add-item{
    position: relative;
    width: 30%;
    padding: 15px 10px;
    border-radius: 10px;
    border: 1px solid #7a7272;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &__close{
      position: absolute;
      top: -10px;
      right: -10px;
      cursor: pointer;
      padding: 10px;
      background-color: #fff;
      border-radius: 50%;
    }
    &__content{
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      align-items: center;
    }
    &__fields{
      display: flex;
      flex-direction: column;
      gap: 5px;

      input{
        padding: 10px;
        border-radius: 5px;
        max-width: 100%;
        width: 100%;
        border:1px solid #7a7272;
        &+span{
          font-size: 10px;
        }
      }
    }
  }
</style>