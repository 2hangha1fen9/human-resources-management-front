import jwtDecode from "jwt-decode"
const state = {
    jwt: JSON.parse(localStorage.getItem("jwt") ?? '{"token":"","expiration":0,"user":{}}'),
}
const mutations = {
    SET_JWT(state, data) {
        state.jwt = data.jwt
        localStorage.jwt = JSON.stringify(data.jwt)
    },
    REMOVE_JWT(state) {
        state.jwt.token = ""
        state.jwt.expiration = 0
        localStorage.removeItem("jwt")
    },
}
const actions = {
    login({ commit }, data) {
        //解析jwt,获取相关信息
        const { exp, payLoad } = jwtDecode(data)
        const jwt = {
            jwt: {
                token: data,
                expiration: exp,
                user: JSON.parse(payLoad ?? "{}"),
            },
        }
        commit("SET_JWT", jwt)
    },
    logout({ commit }) {
        commit("REMOVE_JWT")
    },
}
const getters = {
    //获取Token
    token(state) {
        if (getters.isValid(state)) {
            return state.jwt.token || JSON.parse(localStorage.getItem("jwt") || '{"token":"","expiration":0,"user":{}}').token || ""
        }
        return ""
    },
    //获取用户信息
    user(state) {
        if (getters.isValid(state)) {
            return state.jwt.user || JSON.parse(localStorage.getItem("jwt") || '{"token":"","expiration":0,"user":{}}').user || ""
        }
        return ""
    },
    //判断Token是否在有效期内
    isValid(state) {
        if (!state) return false
        const timestamp = Math.round(new Date().getTime() / 1000) //获取当前unix时间戳
        const expiration = state.jwt.expiration || JSON.parse(localStorage.getItem("jwt") || '{"token":"","expiration":0,"user":{}}').expiration //获取token有效期
        if (timestamp > expiration) {
            return false
        }
        return true
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
