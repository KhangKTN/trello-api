import boardController from '~/controllers/board.controller'
import boardValidation from '~/validations/board.validation'

export const boardRoute = (fastify, _, done) => {
    fastify
        .get('/:id', boardController.getDetail)
        .post('/', { preHandler: fastify.validate(boardValidation.boardCreate, 'body') }, boardController.create)
        .put('/update-column-order-ids', boardController.update)
    done()
}
