import cardController from '~/controllers/card.controller'
import { cardValidate } from '~/validations/card.validation'

export const cardRoute = (fastify, _, done) => {
    fastify.post('/', cardValidate, cardController.create)
    done()
}
