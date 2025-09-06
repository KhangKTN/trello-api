import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/rule.util'

const cardSchema = Joi.object({
    title: Joi.string().required().max(50).trim(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

export const cardValidate = {
    schema: { body: cardSchema },
    validatorCompiler: ({ schema }) => {
        return (data) => schema.validate(data, { abortEarly: false })
    }
}
