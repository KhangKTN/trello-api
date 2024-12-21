import { StatusCodes } from 'http-status-codes'
import { createNew } from '~/controllers/boardController'
import ServerError from '~/utils/serverError'
import { boardValid } from '~/validations/boardValidation'

export const boardRoute = (fastify, _, done) => {
    fastify
        .get('/', async (req, res) => {
            try {
                res.status(StatusCodes.OK).send('Get Board server successfully!')
            } catch (error) {
                throw new ServerError(error.message)
            }
        })
        .post('/', boardValid, createNew)
    done()
}