import axios, { AxiosInstance } from 'axios';
import {Dish, ILoginForm, IRegisterForm} from "../../types";
import {getToken} from "../utils.ts";

const baseURL=import.meta.env.VITE_APP_URL
console.log(baseURL)
const axiosInstance : AxiosInstance=axios.create({
    baseURL,
    timeout:10000,

})

class  Api {
    private axiosInstance;

    constructor() {
        this.axiosInstance=axiosInstance
    }
    async getDishes(){
       const {status,data} = await this.axiosInstance.get('/dishes/all')
        return {status,data}
    }
    async getCategories(){
        const {status,data} = await this.axiosInstance.get('/categories/all')
        return {status,data}
    }
    async register(values:IRegisterForm) {
        const {status,data} = await this.axiosInstance.post('/auth/register',values)
        return{status,data}
    }
    async login(values:ILoginForm){
        const {status,data}=await this.axiosInstance.post('/auth/login',values)
        return {status,data}
    }
    async checkAuth() {
        const {status,data} = await this.axiosInstance.get('/auth/check',{
            headers:{
                'Authorization':getToken()
            }
        })
        return {status,data}
    }
    async getMe() {
        const {status,data} = await this.axiosInstance.get('/auth/getMe',{
            headers:{
                'Authorization':getToken()
            }
        })
        return {status,data}
    }
    async addDish(values:Dish) {
        const formData=new FormData();
        formData.append('name',values.name)
        formData.append('price',values.price)
        formData.append('categoryId',`${values.categoryId}`)
        formData.append('avatar',values.avatar)

        const {status,data} = await this.axiosInstance.post('/dishes/create',formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':getToken()
            },

        })
        return {status,data}
    }
    async updateDish(values:Dish,id:number|string){
        const formData=new FormData();
        formData.append('name',values.name)
        formData.append('price',values.price)
        formData.append('categoryId',`${values.categoryId}`)
        formData.append('avatar',values.avatar)
        const {status,data} = await this.axiosInstance.put(`/dishes/update/${id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':getToken()
            },
        })
        return {status,data}
    }
    async deleteDish(id:number|string) {
        const {status,data} = await this.axiosInstance.delete(`/dishes/delete/${id}`,{
            headers:{
                'Authorization':getToken()
            }
        })
        return {status,data}
    }
}
export  default  new Api()