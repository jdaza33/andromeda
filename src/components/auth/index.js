import Axios from 'axios'
//import router from '@/routes/router'
//import global from '@/config/global'

const BudgetManagerAPI = `http://localhost:4000`

export default {
    user: { authenticated: false },

    authenticate(component, credentials, redirect) {
        Axios.post(`${BudgetManagerAPI}/auth/login`, credentials)
            .then(({ data: { token } }) => {
                component.$cookie.set('token', token, '1D')
                component.validLogin = true
                this.user.authenticated = true

                //if (redirect) router.push(redirect)
                component.$store.commit("SET_LAYOUT", redirect)
            }).catch(({ response: { data } }) => {
                /*component.snackbar = true
                component.message = data.message*/
                alert(data.message)
            })
    },

    /*signup(context, credentials, redirect) {
        Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
            .then(({ data: { token } }) => {
                context.$cookie.set('token', token, '1D')
                context.validSignUp = true
                this.user.authenticated = true

                if (redirect) router.push(redirect)
            }).catch(({ response: { data } }) => {
                context.snackbar = true
                context.message = data.message
            })
    },*/

    checkAuthentication() {
        const token = document.cookie

        if (token) this.user.authenticated = true
        else this.user.authenticated = false
    },

    getAuthenticationHeader(context) {
        return `Bearer ${context.$cookie.get('token')}`
    }
}