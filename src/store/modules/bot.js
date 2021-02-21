import {init, setGuild, setChannel, delMessage} from '../../bot'

const state = {
    dev: '',
    status: false,
    botLogged: false,
    bot: {},
    client: {},
    guild: 0,
    guilds: [],
    channel: {},
    channels: [],
    messages: []
}

const mutations = {
    dev: (state, data) => {
        state.dev = data
    },
    SET_BOT: (state, data) => {
        state.bot = data
    },
    SET_CLIENT: (state, data) => {
        state.client = data;
    },
    SET_GUILD: (state, data) => {
        state.guild = data
    },
    SET_CHANNEL: (state, data) => {
        state.channel = data
    },
    SET_CHANNELS: (state, data) => {
        state.channels = data
    },
    SET_LOGGED: (state, data) => {
        state.botLogged = data
    },
    SET_STATUS: (state, data) => {
        state.status = data
    },
    SET_GUILDS: (state, data) => {
        state.guilds = data
    },
    SET_MESSAGES: (state, data) => {
        state.messages = data
    }
}
const actions = {
    setClient({commit}, data) {
      commit('SET_CLIENT', data)
    },
    delMessage({commit, state}, id) {
        delMessage(commit, state, id)
    },
    setLogged({commit}, data) {
        commit('SET_LOGGED', data)
    },
    setStatus({commit}, data) {
        commit('SET_STATUS', data)
    },
    setChannel({commit, state}, item) {
        setChannel(commit, state, item)
    },
    setGuild({commit, dispatch}, id) {
        setGuild(commit, dispatch, id)
    },
    logout() {
        // commit('SET_LOGGED', false)
        // commit('SET_STATUS', false)
        localStorage.removeItem('token')
        window.location.reload()
    },
    init({commit, dispatch, state}, token) {
        init(commit, dispatch, state, token)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
