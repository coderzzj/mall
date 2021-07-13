import axios from "axios"
const baseConfig = {
    baseURL: "http://152.136.185.210:8000/api/n3",
    timeout: 5000
}

export function request(config){
    // 1.创建axios实例
    const axiosInstance = axios.create(baseConfig);

    // 2.axios拦截器
    axiosInstance.interceptors.request.use((config)=>{
        // 在发送请求之前做些什么
        // 2.1请求拦截的作用
        // 1.比如config中的一些信息不符合服务器的要求
        // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标，例如转圈圈
        // 3.某些网络请求（比如登录token），必须携带一些特殊信息
        // console.log("正在请求数据，请稍等......");
        // console.log(config)
        return config;
    },error=>{
        // 对请求错误做些什么
        return Promise.reject(error);
    })
    axiosInstance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        // 2.2响应拦截
        return response;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      })
    // 3.发送真正的网络请求
    return axiosInstance(config);
}

// export function requestHomeData(){
//     // 1.创建axios实例
//     const axiosInstance = axios.create(baseConfig);

//     // 2.axios拦截器
//     axiosInstance.interceptors.request.use((config)=>{
//         return config;
//     },error=>{
//         return Promise.reject(error);
//     })
//     axiosInstance.interceptors.response.use(function (response) {
//         return response;
//       }, function (error) {
//         return Promise.reject(error);
//       })
//     // 3.发送真正的网络请求
//     return axiosInstance(config);
// }
