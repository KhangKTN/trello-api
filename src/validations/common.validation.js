import Joi from 'joi'
import { OBJECT_ID_TYPE } from '~/utils/rule.util'

/**
 * Use to check request param is object id
 */
const objectIdValid = Joi.object({
    id: OBJECT_ID_TYPE
})

export default { objectIdValid }
