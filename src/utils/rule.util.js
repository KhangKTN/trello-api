import Joi from 'joi'

const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern.'
export const OBJECT_ID_TYPE = Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
