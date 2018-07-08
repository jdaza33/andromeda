import axios from "../../config/axios.js";
import router from '@/routes/router'
import notify from '@/config/notify'

import jwt from 'jsonwebtoken'

export default {
    user: { 
        authenticated: false 
    },

    authenticate(component, credentials, redirect) {
        axios.post(`/auth/login`, credentials)
            .then( res => {

                if(res.data.res){
                    let token = res.data.token

                    component.$cookie.set('token', token, { expires: 3 }, '1D')
                    this.user.authenticated = true

                    /*const username = jwt.verify(token, 'blackencio', function (err, decoded) {
                        return decoded.user.username
                    });*/

                    const userId = jwt.verify(token, 'blackencio', function (err, decoded) {
                        return decoded.user._id
                    });

                    component.$cookie.set('userId', userId)
                    if (redirect) router.push({ name: redirect })

                }else{
                    notify(component,res.data.err)
                }

                
            })
            .catch(err => {
                //TODO
                alert(err)
            })
    },

    checkAuthentication() {
        const token = document.cookie
        if (token) this.user.authenticated = true
        else this.user.authenticated = false
    },

    getAuthenticationHeader(context) {
        return `Bearer ${context.$cookie.get('token')}`
    }
}