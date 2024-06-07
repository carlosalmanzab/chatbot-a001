import { createBot } from '@builderbot/bot'
import { database } from './database'
import { flow } from './flow'
import { provider } from './provider'


const main = async () => {
    const {httpServer, on} = await createBot({
        flow: flow,
        provider: provider,
        database: database,
    })

    httpServer(3000);

    provider.on("message", ({from, body}) => console.log(`Message Payload:`, { body, from }));

    on("send_message", ({from, answer}) => console.log(`Send Message Payload:`, { answer, from }));
}

main()
