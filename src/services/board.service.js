import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb.config'
import boardModal from '~/models/Board.model'
import { slugify } from '~/utils/formatter.util'

const create = async (data) => {
    const newBoard = {
        ...data,
        slug: slugify(data?.title)
    }
    const validData = await boardModal.validateBeforeSave(newBoard)
    let createdBoard = await GET_DB().collection(boardModal.BOARD_COLLECTION_NAME).insertOne(validData)
    if (createdBoard?.insertedId) {
        createdBoard = await findById(createdBoard?.insertedId)
    }

    return createdBoard
}

const findById = async (id) => {
    return await GET_DB()
        .collection(boardModal.BOARD_COLLECTION_NAME)
        .findOne({ _id: ObjectId.createFromHexString(id) }, { projection: { createdAt: 0, updatedAt: 0 } })
}

export default { create, findById }
