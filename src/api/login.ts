import axios from 'axios'

export const login = () => {
    return axios.post('/login')
}

export const auth = () => {
    return axios.get('/auth')
}

export const getMenus = () => {
    return axios.get('/menus')
}