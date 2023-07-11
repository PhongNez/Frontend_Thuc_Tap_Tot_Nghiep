import axios from './Customize-axios'
const fetchApiUser = (page) => {
    return axios.get(`users?page=${page}`)
}

const createUser = (email, password) => {
    return axios.post('/auth/login', { email, password })
}

export { fetchApiUser, createUser }