import Fastify from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { CLOSE_CONNECT, CONNECT_DB } from '~/config/mongodb'
import { homeRoute } from '~/routes/v1'
import { notFoundHandler } from './middlewares/handleError'
import { boardRoute } from './routes/v1/boardRoute'
const exitHook = require('async-exit-hook')

const fastify = Fastify({
    logger: true
})

fastify.setErrorHandler((error, _, res) => {
    console.log(error, `This error has status code ${error.statusCode} and error validation: ${error.validation}`)
    if (error.statusCode === StatusCodes.BAD_REQUEST && error.validationContext) {
        res.status(error.statusCode).send({ message: error.message, errorCode: error.statusCode })
    }
    else if (res.statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
        fastify.log.error(error.message)
        res.send({ message: 'Something is wrong!', errorCode: res.statusCode })
    } else {
        res.send({ message: error.message, errorCode: res.statusCode })
    }
})

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
        await CONNECT_DB()
        fastify.log.info('Connected to MongoDB Atlas!')
        START_SERVER()
    } catch (error) {
        fastify.log.error(error)
        process.exit(0)
    }
})()