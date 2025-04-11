import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5136/api', // 後端 API URL
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
