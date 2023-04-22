import axios from 'axios'
import JSONbig from 'json-bigint'

export const ERequest = axios.create({
    baseURL: 'http://localhost:1016/eshop',
    transformResponse: [function (data) {
        //data 原始后台返回的json字符串数据
        //这里的方法，会覆盖axios默认对于返回结果的处理，默认进行的是JSON.parse
        //需要进行的是JSONbig.parse
        //后台返回的可能不是json，jsonbig处理不了，所以在这里需要对错误进行处理
        try {
            return JSONbig.parse(data)
        } catch (err) {
            //如果解析不了，说明不是json数据，原样返回
            return <data></data>
        }
    }]
})

ERequest.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers = {
            'Authorization': 'Bearer' + localStorage.getItem('token'), //携带权限参数
        };
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error)
    return Promise.reject(error)
})


export default ERequest
