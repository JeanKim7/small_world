import axios from 'axios';
import { UserType, UserFormDataType, TokenType } from '../types';

const baseURL = 'https://basil-database.onrender.com'
const userEndpoint = '/users'
const recipeEndpoint = '/recipes'
const tokenEndpoint = '/token'


const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>>{
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>>{
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username,password).get(tokenEndpoint)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.response?.data.error 
        } else {
            error='Something went wrong'
        }
    }
    return {data, error}
}

async function getMe(token:string): Promise<APIResponse<UserType>>{
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getAllRecipes(){
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(recipeEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }

}

// async function createRecipe(token:string, recipeData) {
//     let data;
//     let error;
//     try{
//         const response = await apiClientTokenAuth(token).post(recipeEndpoint, recipeData)
//         data = response.data
//     } catch(err) {
//         if (axios.isAxiosError(err)){
//             error = err.response?.data.error
//         } else {
//             error = 'Something went wrong'
//         }
//     }
//     return { data, error }
// }

async function getRecipeById(recipeId:string|number) {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(recipeEndpoint + '/' + recipeId)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

// async function editRecipeById(recipeId:string|number, token:string, editedRecipeData) {
//     let data;
//     let error;
//     try{
//         const response = await apiClientTokenAuth(token).put(recipeEndpoint + '/' + recipeId, editedRecipeData)
//         data = response.data
//     } catch(err) {
//         if (axios.isAxiosError(err)){
//             error = err.response?.data?.error || `Recipe with ID ${recipeId} does not exist`
//         } else {
//             error = 'Something went wrong'
//         }
//     }
//     return { data, error }
// }

async function deleteRecipeById(recipeId:string|number, token:string) {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(recipeEndpoint + '/' + recipeId)
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Recipe with ID ${recipeId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

export {
    login,
    register,
    getMe,
    getAllRecipes,
    getRecipeById,
    // createRecipe,
    deleteRecipeById,
    // editRecipeById
}