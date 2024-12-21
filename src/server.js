import Fastify from 'fastify'
import { env } from '~/config/environment'
import { CLOSE_CONNECT, CONNECT_DB } from '~/config/mongodb'
import { homeRoute } from '~/routes/v1'
import { errorHandler, notFoundHandler } from './middlewares/handleError'
import { boardRoute } from './routes/v1/boardRoute'
const exitHook = require('async-exit-hook')

const fastify = Fastify({
    logger: true
})

fastify.setErrorHandler(errorHandler)

const START_SERVER = () => {
    const hostname = env.APP_HOST
    const port = env.APP_PORT

    // Declare a route
    fastify.register(homeRoute, { prefix: '/v1' })
    fastify.register(boardRoute, { prefix: '/v1/board' })

    // Handle notFoundError
    fastify.setNotFoundHandler(notFoundHandler)

    // Run the server!
    fastify.listen({ port }, err => {
        if (err) {
            fastify.log.error(err)
        }
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
        fastify.log.info('Start connect to MongoDB Atlas')
        await CONNECT_DB()
        fastify.log.info('Connected to MongoDB Atlas successfully!')
        START_SERVER()
    } catch (error) {
        fastify.log.error(error)
        process.exit(0)
    }
})()