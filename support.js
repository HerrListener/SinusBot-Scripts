registerPlugin({
    name: 'Support',
    version: '1.0.0',
    backends: ['ts3'],
    description: 'Ein Support Sinusbot Script für MineCookie.de',
    author: 'leonZ.<leonz@electronu.de>',
    vars: [{
        name: "supportchannel",
        title: "Support Channel",
        type: "channel"
    }, {
        name: "supportmsg",
        title: "Lege eine Support Naricht für die Supporter fest.",
        type: "string"
    }]
}, async (_, config) => {
   
    const event = require('event')
    const engine = require('engine')
    const backend = require('backend')

    getSupporter = () => {
        return backend.getClients().filter(client => client.getServerGroups().find(group => group.id() == 29))
    }

    isSupporter = (client) => {
        return (client.getServerGroups().find(group => group.id() == 29)) ? true : false
    }

    event.on("clientMove", event => {
        
        const toChannel = event.toChannel

        if(toChannel && toChannel.id() == config.supportchannel) {
            if(isSupporter(event.client)) {
                event.client.chat("[COLOR=RED]Supporter selbst können kein Support anfordern[/COLOR]")
                return
            }
            getSupporter().forEach(async client => {
                client.chat((config.supportmsg.includes("%user%")) ? config.supportmsg.replace("%user%", event.client.name()) : config.supportmsg)
            })
        } 

    })

    setInterval(async () => {

        const channel = backend.getChannelByID(config.supportchannel)

        if(getSupporter().length == 0) {
            if(channel.maxClients() > 0) channel.setMaxClients(0)
        } else {
            if(channel.maxClients() == 0) channel.setMaxClients(2)
        }

    }, 1000)
   
})