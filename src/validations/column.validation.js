import Joi from 'joi'
import CardModel from '~/models/Card.model'
import ColumnModel from '~/models/Column.model'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/rule.util'
import cardValidation from './card.validation'

const columnCreate = Joi.object({
    title: ColumnModel.columnSchema.extract('title'),
    boardId: ColumnModel.columnSchema.extract('boardId')
})

const columnUpdate = Joi.object({
    _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: ColumnModel.columnSchema.extract('title'),
    boardId: ColumnModel.columnSchema.extract('boardId'),
    cardOrderIds: ColumnModel.columnSchema.extract('cardOrderIds')
})

const updateCardOrderIds = Joi.object({
    card: cardValidation.cardUpdate,
    sourceColumnId: CardModel.cardSchema.extract('columnId'),
    targetColumnId: CardModel.cardSchema.extract('columnId'),
    cardOrderIds: ColumnModel.columnSchema.extract('cardOrderIds')
})

export default { columnCreate, columnUpdate, updateCardOrderIds }
