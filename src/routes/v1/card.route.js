import cardController from '~/controllers/card.controller'
import cardValidation from '~/validations/card.validation'

export const cardRoute = (fastify, _, done) => {
    fastify.post('/', { preHandler: fastify.validate(cardValidation.cardCreate, 'body') }, cardController.create)
    done()
}
