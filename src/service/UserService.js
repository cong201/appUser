import axios from './custumize'

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreatUser = (name, job) => {
    return axios.post("/api/users", { name, job })
}

const putUpdateUser = (name, job, id) => {
    return axios.put(`/api/users/${id}`, { name, job })
}

export { fetchAllUser, postCreatUser, putUpdateUser }