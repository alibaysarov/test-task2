<script lang="ts">
import {Form, Field, ErrorMessage} from "vee-validate";

import PageLayout from "../components/PageLayout.vue";
import Container from "../components/Container.vue";

import {ref} from "vue";
import {useStore} from "vuex";
export default {
  name:"Register",
  components:{PageLayout,Container,Form,Field,ErrorMessage},
  setup(){
    const store = useStore()

    const isShown=ref<boolean>(false)
    const passwordShow=()=>{
      isShown.value=!isShown.value
    }
    const onSubmit=(values)=> {
      //console.log(JSON.stringify(values, null, 2));
      store.dispatch('register',values)
    }
    const nameValidate = (value)=>{
      if (!value) {
        return 'Это поле обязательно';
      }

      return true;
    }
    const passwordValidate=(value)=>{
      if (!value) {
        return 'Это поле обязательно';
      }

      return true;
    }
    const emailValidate= (value)=>{
      if (!value) {
        return 'Это поле обязательно';
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Неверный формат email';
      }
      return true;
    }
    return{
      isShown,
      passwordShow,
      emailValidate,
      onSubmit,
      passwordValidate,
      nameValidate
    }
  }
}
</script>

<template>
  <PageLayout>
    <Container>
      <div class="login-page">
        <h2 class="title_h2 text-center">Регистрация</h2>

        <Form  class="login-form" @submit="onSubmit">
          <div class="login-form__name">
            <Field placeholder="Введите имя" name="name"  type="text"  :rules="nameValidate" class="field__email"/>
            <ErrorMessage name="name" />
          </div>
          <div class="login-form__email">
            <Field placeholder="Введите почту" name="email"  type="email"  :rules="emailValidate" class="field__email"/>
            <ErrorMessage name="email" />
          </div>
          <div class="login-form__password">
            <Field :rules="passwordValidate" name="password" :type="isShown?'text':'password'" class="field__password"/>
            <span @click="passwordShow">Показать</span>
          </div>
          <button type="submit" class="button-fill">Зарегистрироваться</button>
        </Form>
      </div>
    </Container>
  </PageLayout>
</template>

<style scoped lang="scss">
.login-page{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &__name,&__email{
    width: 100%;
    max-width: 500px;
    input{
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border:1px solid #736a6a;
      outline: 0px;

    }
  }
  &__password{
    width: 100%;
    max-width: 500px;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    border:1px solid #736a6a;
    overflow: hidden;
    padding-right: 10px;

    input{
      flex: 1 1 85%;
      padding: 10px;
      outline: none;
      border: none;
      height: 100%;
    }
    span{
      font-size: 10px;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>