import axios from 'axios'

export const ERequest = axios.create({
    baseURL: 'http://localhost:1016/eshop',
    headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('token')
    }
})

ERequest.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers = {
            'Authorization': localStorage.getItem('token'), //携带权限参数
        };
    }
    return config
}, function (error) {
    return Promise.reject(error)
})
axios.interceptors.response.use(function (response){
    return response
}, function(error){
    console.log(error)
    return Promise.reject(error)
})



export default ERequest
