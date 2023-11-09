export interface Dish{
    id?:number,
    name:string,
    price:string,
    categoryId:number|string,
    avatar:File|string
}
export interface ICategory{
    id:number,
    name:string,
    avatar:string|null
}

export interface IUser{
    username:string
    email:string,
    token:string
}

export interface ILoginForm{
    email:string,
    password:string
}
export interface IRegisterForm{
    name:string,
    email:string,
    password:string
}
export interface IRegisterResponse{
    user:{
        name:string,
        email:string,
        token:string,
    },
    status:number
}