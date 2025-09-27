import cardController from '~/controllers/card.controller'
import cardValidation from '~/validations/card.validation'
import commonValidation from '~/validations/common.validation'

export const cardRoute = (fastify, _, done) => {
    fastify
        .post('/', { preHandler: fastify.validate(cardValidation.cardCreate, 'body') }, cardController.create)
        .put('/', { preHandler: fastify.validate(cardValidation.cardUpdate, 'body') }, cardController.update)
        .delete(
            '/:id',
            { preHandler: fastify.validate(commonValidation.objectIdValid, 'params') },
            cardController.remove
        )
    done()
}
