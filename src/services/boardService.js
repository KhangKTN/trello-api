import { GET_DB } from '~/config/mongodb'
import boardModal from '~/models/boardModel'
import { slugify } from '~/utils/formatter'

const createNewBoard = async (data) => {
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
    return GET_DB().collection(boardModal.BOARD_COLLECTION_NAME).findOne(id)
}

export default { createNewBoard, findById }
