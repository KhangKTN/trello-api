import fp from 'fastify-plugin'
import { StatusCodes } from 'http-status-codes'

async function joiPlugin(fastify) {
    // Add func validate into instance
    fastify.decorate('validate', (schema, property = 'body') => {
        return async (request, reply) => {
            const { error } = schema.validate(request[property], {
                abortEarly: false,
                stripUnknown: true // Remove unnecessary field
            })

            if (error) {
                return reply.status(StatusCodes.BAD_REQUEST).send({
                    message: 'Validation error',
                    details: error.details.map((err) => ({
                        field: err.context.key,
                        message: err.message
                    }))
                })
            }
        }
    })
}

export default fp(joiPlugin)
