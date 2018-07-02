import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        layout: 'home'
    },
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