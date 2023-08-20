const state = {
    sidebar: {
        //!!+ 字符串转boolean
        opened: localStorage.getItem("sidebarStatus") ? !!+(localStorage.getItem("sidebarStatus") ?? "") : true,
    },
}
const mutations = {
    SET_STATUS: (state, flag) => {
        state.sidebar.opened = flag
        localStorage.setItem("sidebarStatus", flag ? "1" : "0")
    },
    TOGGLE_SIDEBAR: (state) => {
        //对状态取反
        state.sidebar.opened = !state.sidebar.opened
        if (state.sidebar.opened) {
            localStorage.setItem("sidebarStatus", "1")
        } else {
            localStorage.setItem("sidebarStatus", "0")
        }
    },
    CLOSE_SIDEBAR: (state) => {
        state.sidebar.opened = true
        localStorage.setItem("sidebarStatus", "0")
    },
}
const actions = {
    //切换侧边栏状态
    toggleSideBar({ commit }) {
        commit("TOGGLE_SIDEBAR")
    },
    closeSideBar({ commit }) {
        commit("CLOSE_SIDEBAR")
    },
    setStatus({ commit }, flag) {
        commit("SET_STATUS", flag)
    },
}
const getters = {
    sidebar: (state) => state.sidebar,
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
