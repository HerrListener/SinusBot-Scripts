registerPlugin({
    name: 'Statistiken',
    version: '1.0.0',
    backends: ['ts3'],
    description: 'Ein Statistiken Sinusbot Script für MineCookie.de',
    author: 'leonZ.<leonz@electronu.de>',
    vars: [{
        name: "onlineuser",
        title: "Channel für die derzeiten Online User",
        type: "channel"
    }]
}, (_, config) => {
   
    const event = require('event')
    const engine = require('engine')
    const backend = require('backend')

    getChannel = () => {
        return backend.getChannelByID(config.onlineuser)
    }

    setInterval(() => {

        const channel = backend.getChannelByID(config.onlineuser)

        channel.setName(`[cspacer]Derzeit sind ${backend.getClients().filter(client => !client.getServerGroups().find(group => group.id() == 40)).length} User online`)

    }, 1000*3)
   
})