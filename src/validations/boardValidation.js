import Joi from 'joi'

export const boardSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(500).trim().strict()
})

export const createBoard = ({ schema, method, url, httpPart }) => {
    const boardRule = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(500).trim().strict()
    })
    // return data => boardRule.validate(data)
    try {
        // boardRule.validate({ ...req.body }, { abortEarly: false })
    } catch (error) {
        // res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
        //     message: 'Create board failed!',
        //     error: new Error(error).message
        // })
        // res.status(StatusCodes.BAD_REQUEST)
        // throw new Error(new Error(error).message)
        return { error }
    }
}
