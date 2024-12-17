import { StatusCodes } from 'http-status-codes'

export const homeRoute = (fastify, _, done) => {
    fastify.get('/', async (req, res) => {
        res.status(StatusCodes.OK).send('Get home server successfully!')
    })
    done()
}