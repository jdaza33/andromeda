import axios from "../../config/axios.js";
import router from '@/routes/router'
//import global from '../../config/global'
import jwt from 'jsonwebtoken'

export default {
    user: { 
        authenticated: false 
    },

    authenticate(component, credentials, redirect) {
        axios.post(`/auth/login`, credentials)
            .then(({ data: { token } }) => {
                component.$cookie.set('token', token, { expires: 3 }, '1D')
                this.user.authenticated = true

                const username = jwt.verify(token, 'blackencio', function (err, decoded) {
                    return decoded.user.username
                });

                const userId = jwt.verify(token, 'blackencio', function (err, decoded) {
                    return decoded.user._id
                });

                if (redirect) router.push({ name: redirect, params: { userId: userId, username: username}})
                //component.$store.commit("SET_LAYOUT", redirect)
            }).catch(({ response: { data } }) => {
                //TODO
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