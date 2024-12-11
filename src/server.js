import Fastify from 'fastify'
import { env } from '~/config/environment'
import { CLOSE_CONNECT, CONNECT_DB } from './config/mongodb'
const exitHook = require('async-exit-hook')

const fastify = Fastify({
    logger: true
})

const START_SERVER = () => {
    const hostname = env.APP_HOST
    const port = env.APP_PORT

    // Declare a route
    fastify.get('/', async (req, res) => {
        // console.log(
        //     sortArrayByOtherArray(
        //         [
        //             { id: 'id-1', name: 'One' },
        //             { id: 'id-2', name: 'Two' },
        //             { id: 'id-3', name: 'Three' },
        //             { id: 'id-4', name: 'Four' },
        //             { id: 'id-5', name: 'Five' }
        //         ],
        //         ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
        //         'id'
        //     )
        // )
        res.send('<h1>Hello World!</h1><hr>')
    })

    // Run the server!
    fastify.listen({ port }, err => {
        if (err) throw err
        fastify.log.info(`Trello API is running at ${hostname}:${port}/`)
    })

    exitHook(() => {
        CLOSE_CONNECT()
        fastify.log.info('Closing server...!')
    })
}

// Immediately Invoked Function Expression (IIFE)
(async () => {
    try {
        await CONNECT_DB()
        fastify.log.info('Connected to MongoDB Atlas!')
        START_SERVER()
    } catch (error) {
        fastify.log.error(error)
        process.exit(0)
    }
})()
