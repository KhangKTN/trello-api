import { slugify } from '~/utils/formatter'

const createNewBoard = async data => {
    const newBoard = {
        ...data,
        slug: slugify(data?.title)
    }
    return newBoard
}

export { createNewBoard }
