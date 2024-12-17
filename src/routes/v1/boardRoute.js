import { StatusCodes } from 'http-status-codes'
import { createNew } from '~/controllers/boardController'
import { boardSchema } from '~/validations/boardValidation'

export const boardRoute = (fastify, _, done) => {
    fastify
        .get('/', async (req, res) => {
            try {
                let a = a.map(i => i)
                res.status(StatusCodes.OK).send('Get Board server successfully!')
            } catch (error) {
                res.status(500)
                throw new Error(new Error(error).message)
            }
        })
        .post(
            '/',
            {
                schema: { body: boardSchema },
                validatorCompiler: ({ schema, method, url, httpPart }) => {
                    return data => schema.validate(data, { abortEarly: false })
                }
            },
            createNew
        )
    done()
}