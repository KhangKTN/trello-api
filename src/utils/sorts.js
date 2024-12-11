/**
 * Order an array of objects based on another array & return new Sorted Array
 * The current array will not be modified.
 * ---
 * @param {*} currentArray
 * @param {*} sortedArray
 * @param {*} key = Order by key
 * @return new Sorted Array
*/
export const sortArrayByOtherArray = (currentArray, sortedArray, orderBy) => {
    if (!currentArray?.length || !sortedArray?.length || !orderBy) {
        return []
    }
    return [...currentArray].sort((a, b) => sortedArray.indexOf(a[orderBy]) - sortedArray.indexOf(b[orderBy]))
}