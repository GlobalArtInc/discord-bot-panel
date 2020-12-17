import Discord from 'discord.js'

const client = new Discord.Client();

const fetchGuilds = (guilds) => {
    let arr = []
    guilds.forEach((item) => {
        arr.push({
            id: item.id,
            name: item.name
        })
    })
    return arr;
}

const fetchChannels = (channels) => {
    let arr = []
    channels.filter((e) => e.type === 'text').forEach((item) => {
        arr.push({
            id: item.id,
            name: item.name
        })
    })
    return arr;
}

const fetchMessages = (messages) => {
    let arr = []
    messages.forEach((message) => {
        message['created'] = formatDate(message.createdAt)
        arr.push(message)
    })
    return arr
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-') + ' ' + [hours, minutes, seconds].join(':');
}

export function delMessage(commit, state, id) {
    let channel = client.channels.cache.get(state.channel.id)
    let message = channel.messages.cache.get(id)
    message.delete()
    if (message.channel.id === state.channel.id) {
        channel.messages.fetch().then(res => {
            commit('SET_MESSAGES', fetchMessages(res))
        })
    }
}

export function getChannel(id) {
    let channel = client.channels.cache.get(id)
    if (channel) {
        return channel.name
    }
}

export function getUser(id) {
    let user = client.users.cache.find((user) => user.id === id);
    if (user) {
        return user.username
    }
}

export function setChannel(commit, state, item) {
    const channel = client.channels.cache.get(item)
    channel.messages.fetch().then(res => {
        commit('SET_MESSAGES', fetchMessages(res))
    })
    commit('SET_CHANNEL', channel)
}

export function setGuild(commit, dispatch, id) {
    const channels = fetchChannels(client.guilds.cache.get(id).channels.cache)
    commit('SET_GUILD', id)
    dispatch('setChannel', channels[0].id)
    commit('SET_CHANNELS', channels)
}

export function init(commit, dispatch, state, token) {
    client.login(token).then(() => {
        localStorage.setItem('token', token)
        commit('SET_LOGGED', true)
    }).catch(() => {
        dispatch('logout')
    })

    client.on('ready', () => {
        let guilds = fetchGuilds(client.guilds.cache)

        commit('SET_GUILDS', guilds)
        dispatch('setGuild', guilds[0].id)
    })

    client.on('messageUpdate', (e) => {
        if (e.channel.id === state.channel.id) {
            const channel = client.guilds.cache.get(state.guild).channels.cache.get(state.channel.id)
            channel.messages.fetch().then(res => {
                commit('SET_MESSAGES', fetchMessages(res))
            })
        }
    })

    client.on('messageDelete', (e) => {
        if (e.channel.id === state.channel.id) {
            const channel = client.guilds.cache.get(state.guild).channels.cache.get(state.channel.id)
            channel.messages.fetch().then(res => {
                commit('SET_MESSAGES', fetchMessages(res))
            })
        }
    })

    client.on('message', (e) => {
        if (e.channel.id === state.channel.id) {
            const channel = client.guilds.cache.get(state.guild).channels.cache.get(state.channel.id)
            channel.messages.fetch().then(res => {
                commit('SET_MESSAGES', fetchMessages(res))
            })
        }
    })

    client.on('channelCreate', (e) => {
        if (state.guild === e.guild.id) {
            const channels = fetchChannels(client.guilds.cache.get(state.guild).channels.cache)
            commit('SET_CHANNELS', channels)
        }
    })

    client.on('channelDelete', (e) => {
        if (state.guild === e.guild.id) {
            const channels = fetchChannels(client.guilds.cache.get(state.guild).channels.cache)
            commit('SET_CHANNELS', channels)
        }
    })

    client.on('guildCreate', () => {
        commit('SET_GUILDS', fetchGuilds(client.guilds.cache))
    })

    client.on('guildDelete', () => {
        commit('SET_GUILDS', fetchGuilds(client.guilds.cache))
    })

    client.on('guildUpdate', () => {
        commit('SET_GUILDS', fetchGuilds(client.guilds.cache))
    })
}
