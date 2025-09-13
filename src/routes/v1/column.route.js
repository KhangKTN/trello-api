import columnController from '~/controllers/column.controller'
import columnValidation from '~/validations/column.validation'

export const columnRoute = (fastify, _, done) => {
    fastify
        .post('/', { preHandler: fastify.validate(columnValidation.columnCreate, 'body') }, columnController.create)
        .put(
            '/update-card-order-ids',
            { preHandler: fastify.validate(columnValidation.updateCardOrderIds, 'body') },
            columnController.updateCardOrder
        )
        .delete('/:id', columnController.deleteColumn)
    done()
}
