import axios from 'axios'

axios.interceptors.request.use(function (config){
  return config
},function (error){
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response){
    return response
}, function(error){
    console.log(error)
    return Promise.reject(error)
})

export const ERequest = axios.create({
    baseURL: 'http://localhost:1016',
    headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token')
    }
})

export default ERequest
