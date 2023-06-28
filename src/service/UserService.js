import axios from './custumize'

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

export { fetchAllUser }