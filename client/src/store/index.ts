import {createStore, Store as VuexStore, CommitOptions, DispatchOptions, Commit} from 'vuex';
import {Dish,ICategory, ILoginForm, IRegisterForm, IUser} from "../../types";
import api from "../api";


import {setToken} from "../utils.ts";
import router from "../router";

interface State {
    count: number;
    user:IUser|null,
    isAuth:boolean,
    dishes:Dish[],
    categories:ICategory[],
    errorLabel:{
        text:string
        isShow:boolean
    }
}

const state: State = {
    count: 0,
    dishes:[],
    categories:[],
    user:null,
    isAuth:false,
    errorLabel:{
        text:'',
        isShow:false
    }
};

const mutations = {

    showErrorLabel(state:State,error:string) {
        state.errorLabel.text=error
        state.errorLabel.isShow=true
        setTimeout(()=>{
            state.errorLabel.text=""
            state.errorLabel.isShow=false
        },2500)
    },
    loginSuccess(state:State,user:IUser) {
        state.user=user
        state.isAuth=true
        setToken(user.token)
        router.push('/profile')
    },
    setUser(state:State,user:IUser){
        state.user=user
    },
    setAuth(state:State,isAuth:boolean) {
        if(isAuth) {
            state.isAuth=isAuth
            //router.push('/profile').then(()=>console.log("success"))
            return true
        } else {
            console.log("no auth")
            //router.push('/')
        }

    },
    setRegisteredUser(state:State, isAuth:boolean) {
        if(isAuth) {
            state.isAuth=isAuth
            router.push('/profile')
            return true
        }

    },

    setDishes(state:State,data:Dish[]|[]) {
        state.dishes=data
    },
    setCategories(state:State,data:ICategory[]|[]) {
        state.categories=data
    },
    addDish(state:State,data:Dish){
        data.avatar=`http://localhost:3000/${data.avatar}`
        state.dishes.push(data)
    },
    updateDish(state:State,data:{values:Dish,id:string|number}){
        state.dishes = state.dishes.map((dish:Dish)=>{
            if(+dish.id === +data.id) {
                dish = data.values
                return dish
            }
            return dish
        })
    },
    deleteDish(state:State,data:number|string) {
        state.dishes = state.dishes.filter(dish=>dish.id !== data)
        return state
    }
};

const actions = {
    async fetchCategories(context:{commit:Commit}) {
        const {status,data}= await api.getCategories();
        switch (status) {
            case 404:
                context.commit('setCategories',[])
                break;
            case 500:
                context.commit('setCategories',[])
                break;
            case 200:
                context.commit('setCategories',data)
                break;
        }
    },
    async fetchDishes(context:{commit:Commit}) {
        const {status,data} = await api.getDishes()
        switch (status) {
            case 404:
                context.commit('setDishes',[])
                break;
            case 500:
                context.commit('setDishes',[])
                break
            case 200:
                context.commit('setDishes',data)
                break
        }
    },

    async fetchUser(context:{commit:Commit}) {
        const {status,data} = await api.getMe()
        switch (status) {
            case 500:
                context.commit('setAuth',false)
                break;
            case 403:
                context.commit('setAuth',false)
                break;
            case 401:
                context.commit('setAuth',false)
                break;
            case 200:
                context.commit('setAuth',true)
                context.commit('setUser',data)
                break
        }
    },
    async checkAuth(context:{commit:Commit}) {
        const {status}=await api.checkAuth()
        switch (status) {
            case 500:
                context.commit('setAuth',false)
                break;
            case 403:
                context.commit('setAuth',false)
                break;
            case 401:
                context.commit('setAuth',false)
                break;
            case 200:
                context.commit('setAuth',true)
                break;
        }
    },
    async register(context:{commit:Commit},payload:IRegisterForm) {
        const {status,data} = await api.register(payload);
        switch (status) {
            case 400:
                context.commit('showErrorLabel',data)
                break;
            case 201:
                context.commit('loginSuccess',data.user)
                break;
        }
    },
    async login(context:{commit:Commit},payload:ILoginForm) {
        const {data,status}=await api.login(payload)
        switch (status) {
            case 401:
                context.commit('showErrorLabel',data)
                break;
            case 200:
                context.commit('loginSuccess',data.user)
                break;
        }
    },
    async addDish(context:{commit:Commit},payload:Dish) {
        const {status,data} = await api.addDish(payload)
        switch (status) {
            case 401:
                context.commit('showErrorLabel','Ошибка при добавлении файла')
                break;
            case 403:
                context.commit('showErrorLabel','Ошибка при добавлении файла')
                break;
            case 500:
                context.commit('showErrorLabel','Ошибка при добавлении файла')
                break;
            case 200:
                context.commit('addDish',data)
                break;
        }
    },
    async updateDish(context:{commit:Commit},payload:{values:Dish,id:number|string}) {
        const {status,data} = await api.updateDish(payload.values,payload.id);
        switch (status) {
            case 401:
                context.commit('showErrorLabel','Ошибка при обновлении блюда')
                break;
            case 403:
                context.commit('showErrorLabel','Ошибка при обновлении блюда')
                break;
            case 500:
                context.commit('showErrorLabel','Ошибка при обновлении блюда')
                break;
            case 200:
                context.commit('updateDish',{
                    values:data,
                    id:payload.id
                })
                break;
        }

    },
    async deleteDish(context:{commit:Commit},payload:number|string) {
        const {status} = await api.deleteDish(payload);
        switch (status) {
            case 401:
                context.commit('showErrorLabel','Ошибка при обновлении блюда')
                break;
            case 403:
                context.commit('showErrorLabel','Ошибка при обновлении блюда')
                break;
            case 500:
                context.commit('showErrorLabel','Ошибка при обновлении блюда')
                break;
            case 200:
                context.commit('deleteDish',payload);
                break;
        }
}
};

const getters = {
    getCount(state: State): number {
        return state.count;
    },
    getAuth(state: State){
        return state.isAuth
    },
    getUser(state:State) {
        return state.user
    }
};
export const store = createStore({
    state,
    mutations,
    actions,
    getters,
});

// Define the store types
export type RootState = State;
export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof typeof mutations, P extends Parameters<typeof mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<typeof mutations[K]>;
} & {
    dispatch<K extends keyof typeof actions>(
        key: K,
        payload?: Parameters<typeof actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<typeof actions[K]>;
};