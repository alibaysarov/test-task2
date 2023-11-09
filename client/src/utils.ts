

export const getToken= ():string |null=> {
    return window.localStorage.getItem('token')?`Bearer ${window.localStorage.getItem('token')}` :null
}
export const setToken= (token:string):void=> {
     window.localStorage.setItem('token',token)
}