import Joi from 'joi'
import CardModel from '~/models/Card.model'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/rule.util'

const cardCreate = Joi.object({
    title: CardModel.cardSchema.extract('title'),
    boardId: CardModel.cardSchema.extract('boardId'),
    columnId: CardModel.cardSchema.extract('columnId')
})

const cardUpdate = Joi.object({
    _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: CardModel.cardSchema.extract('title').optional(),
    boardId: CardModel.cardSchema.extract('boardId').optional(),
    columnId: CardModel.cardSchema.extract('columnId').optional(),
    description: CardModel.cardSchema.extract('description').optional()
})

export default { cardCreate, cardUpdate }
