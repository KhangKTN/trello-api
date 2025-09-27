import Joi from 'joi'
import BoardModel from '~/models/Board.model'
import { OBJECT_ID_TYPE } from '~/utils/rule.util'

const boardCreate = Joi.object({
    title: BoardModel.boardSchema.extract('title'),
    description: BoardModel.boardSchema.extract('description'),
    type: BoardModel.boardSchema.extract('type')
})

const boardUpdate = Joi.object({
    _id: OBJECT_ID_TYPE,
    title: BoardModel.boardSchema.extract('title').optional(),
    description: BoardModel.boardSchema.extract('description').optional(),
    type: BoardModel.boardSchema.extract('type').optional(),
    columnOrderIds: Joi.array().items(OBJECT_ID_TYPE).optional()
})

export default { boardCreate, boardUpdate }
