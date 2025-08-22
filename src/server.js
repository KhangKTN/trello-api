import fastifyCors from '@fastify/cors'
import exitHook from 'async-exit-hook'
import Fastify from 'fastify'
import { env } from '~/config/env.config'
import { CLOSE_CONNECT, CONNECT_DB } from '~/config/mongodb.config'
import { homeRoute } from '~/routes/v1'
import { corsOptions } from './config/cors.config'
import errorHandlerMiddleware from './middlewares/error-handler.middleware'
import { boardRoute } from './routes/v1/board.route'
import { cardRoute } from './routes/v1/card.route'
import { columnRoute } from './routes/v1/column.route'

const fastify = Fastify({
    logger: true
})

fastify.setErrorHandler(errorHandlerMiddleware.errorHandler)

const START_SERVER = () => {
    const hostname = env.APP_HOST
    const port = env.APP_PORT

    // Register CORS
    fastify.register(fastifyCors, corsOptions)

    // Declare a route
    fastify.register(homeRoute, { prefix: '/v1' })
    fastify.register(boardRoute, { prefix: '/v1/board' })
    fastify.register(columnRoute, { prefix: '/v1/column' })
    fastify.register(cardRoute, { prefix: '/v1/card' })

    // Handle not found
    fastify.setNotFoundHandler(errorHandlerMiddleware.notFoundHandler)

    // Run the server!
    fastify.listen({ port }, (err) => {
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
;(async () => {
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
