import boardController from '~/controllers/board.controller'
import { boardValidate } from '~/validations/board.validation'

export const boardRoute = (fastify, _, done) => {
    fastify
        .get('/:id', boardController.getDetail)
        .post('/', boardValidate, boardController.create)
        .put('/update-column-order-ids', boardController.update)
    done()
}
