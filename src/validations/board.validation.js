import Joi from 'joi'
import BoardModel from '~/models/Board.model'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/rule.util'

const boardCreate = Joi.object({
    title: BoardModel.boardSchema.extract('title'),
    description: BoardModel.boardSchema.extract('description'),
    type: BoardModel.boardSchema.extract('type')
})

const boardUpdate = Joi.object({
    _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: BoardModel.boardSchema.extract('title'),
    description: BoardModel.boardSchema.extract('description'),
    type: BoardModel.boardSchema.extract('description'),
    columnOrderIds: Joi.array().items(Joi.string())
})

export default { boardCreate, boardUpdate }
