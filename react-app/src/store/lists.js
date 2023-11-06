// Action Constants ------------------------
const READ_LISTS = "lists/READ_LISTS"
// const READ_ONE_LIST = "lists/READ_ONE_LIST"
const ADD_LIST = 'lists/ADD_LIST'
const UPDATE_LIST = 'lists/UPDATE_LIST'
const DELETE_LIST = 'lists/DELETE_LIST'

// Action Creators ------------------------
const readLists = (allLists) => ({
    type: READ_LISTS,
    allLists
})

// const readOneList = (oneList) => ({
//     type: READ_ONE_LIST,
//     oneList
// })

const addList = (listData) => ({
    type: ADD_LIST,
    listData
})

const updateList = (listData, listId) => ({
    type: UPDATE_LIST,
    listData,
    listId
})

const deleteList = (listId) => ({
    type: DELETE_LIST,
    listId
})

// Thunks ----------------------------------
// Get all the lists, it should retrieve all of them belonging to a specific board
// Send the boardId to the backend
export const getAllListsThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/lists/all/${boardId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readLists(data))  // Sends back all lists to action creator
    } else {
        return "Response Error"
    }
}

// // Get one list
// export const getOneListThunk = (ListId) => async (dispatch) => {
//     const response = await fetch(`/api/lists/${ListId}`, {
//         method: 'GET'
//     })

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(readOneList(data))    // Sends back one ;ist to action creator
//     } else {
//         return "Response Error"
//     }
// }

// Create a new list
// Send boardId to add to new list board_id
export const createListThunk = (listData, boardId) => async (dispatch) => {
    const response = await fetch(`/api/lists/new/${boardId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addList(data))    // Sends back one list to action creator
    } else {
        return "Response Error"
    }
}

// Update an existing list
export const updateListThunk = (listData, listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/update/${listId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(listData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateList(data, listId))    // Sends back one list to action creator
    } else {
        return "Response Error"
    }
}

// Delete a list
export const deleteListThunk = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/delete/${listId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteList(listId))    // Sends back one list to action creator
        return "Deleted"
    } else {
        return "Response Error"
    }
}


// Reducer -------------------------------------
const initialState = { lists: {} }
export default function listsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_LISTS:
            newState = { ...state, lists: {} }
            action.allLists.lists.forEach(list => {
                newState.lists[list.id] = list
            });
            return newState;
        // case READ_ONE_LIST:
        //     newState = { ...state }
        //     newState.singleList = action.oneList;
        //     return newState;
        case ADD_LIST:
            newState = { ...state }
            newState.lists[action.listData.id] = action.listData
            return newState;
        case UPDATE_LIST:
            newState = { ...state }
            newState.lists[action.listId] = action.listData;
            return newState;
        case DELETE_LIST:
            newState = { ...state }
            delete newState.lists[action.listId];
            return newState;
        default:
            return state;
    }
}
