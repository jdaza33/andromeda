import axios from 'axios'
import global from './global'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false });
NProgress.configure({ minimum: 0.3 });

// create a new axios instance
const instance = axios.create({
    baseURL: global.path.api,
    timeout: 3000
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
    NProgress.start()
    return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
    NProgress.done()
    return response
})

export default instance