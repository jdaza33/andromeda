import axios from 'axios'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false });
NProgress.configure({ minimum: 0.3 });

const port = process.env.IS_PRODUCTION == 1 ? process.env.API_URL : 'http://localhost:4000';

// create a new axios instance
const instance = axios.create({
    baseURL: port,
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