const getters = {
    client: state => state.bot.client,
    status: state => state.bot.status,
    guild: state => state.bot.guild,
    guilds: state => state.bot.guilds,
    channel: state => state.bot.channel,
    channels: state => state.bot.channels,
    messages: state => state.bot.messages,
    currentGuild: state => state.bot.currentGuild,
    botLogged: state => state.bot.botLogged
}
export default getters
