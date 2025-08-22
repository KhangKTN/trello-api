import columnController from '~/controllers/column.controller'
import { columnValidate } from '~/validations/column.validation'

export const columnRoute = (fastify, _, done) => {
    fastify.post('/', columnValidate, columnController.create)
    done()
}
