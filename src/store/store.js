import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

let vuexLocalStorage = null;

if (process.browser) {

    vuexLocalStorage = new VuexPersist({
        key: 'vuex', // The key to store the state on in the storage provider.
        storage: window.localStorage, // or window.sessionStorage or localForage
    })
}

export const store = new Vuex.Store({
    state: {
        layout: 'home'
    },
    plugins: process.browser ? [vuexLocalStorage.plugin] : [],
    mutations: {
        SET_LAYOUT (state, newLayout) {
            state.layout = newLayout
        }
    },
    getters: {
        layout (state) {
            return state.layout
        }
    }
})