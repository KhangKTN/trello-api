const Joi = require('joi')

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(500).trim().strict(),
    columnOrderIds: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _isDestroy: Joi.boolean().default(false)
})

export const boardModal = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA
}