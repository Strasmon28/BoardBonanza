//Action Constants ------------------------
const ADD_LABEL = "labels/ADD_LABEL"
const READ_LABELS = "labels/READ_LABELS"
const UPDATE_LABEL = "labels/UPDATE_LABEL"
const DELETE_LABEL = "labels/DELETE_LABEL"

// Action Creators ------------------------
const readCards = (allCards) => ({
    type: READ_LABELS,
    allCards
})

// const readOnelabel = (onelabel) => ({
//     type: READ_ONE_label,
//     onelabel
// })

const addCard = (labelData) => ({
    type: ADD_LABEL,
    labelData
})

const updateCard = (labelData, labelId) => ({
    type: UPDATE_LABEL,
    labelData,
    labelId
})

const deleteCard = (labelId) => ({
    type: DELETE_LABEL,
    labelId
})

// Thunks ----------------------------------

// Gets all labels belonging to a specific board
// Send a boardId to get request
export const getAllCardsThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/labels/all/${boardId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readCards(data))  // Sends back all lists to action creator
    } else {
        return "Response Error"
    }
}

// Create a new label
// Send boardId to add to new label board_id
export const createCardThunk = (labelData, listId) => async (dispatch) => {
    const response = await fetch(`/api/labels/new/${listId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(labelData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addCard(data))    // Sends back one label to action creator
    } else {
        return "Response Error"
    }
}

// Update an existing label
export const updateCardThunk = (labelData, labelId) => async (dispatch) => {
    const response = await fetch(`/api/labels/update/${labelId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(labelData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateCard(data, labelId))    // Sends back one label to action creator
    } else {
        return "Response Error"
    }
}

// Delete a label
export const deleteCardThunk = (labelId) => async (dispatch) => {
    const response = await fetch(`/api/labels/delete/${labelId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteCard(labelId))    // Sends back one label to action creator
        return "Deleted"
    } else {
        return "Response Error"
    }
}

// Reducer -------------------------------------
const initialState = { labels: {} }
export default function labelsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_LABELS:
            newState = { ...state, labels: {} }
            action.allCards.labels.forEach(label => {
                newState.labels[label.id] = label
            });
            return newState;
        // case READ_ONE_label:
        //     newState = { ...state }
        //     newState.singlelabel = action.onelabel;
        //     return newState;
        case ADD_LABEL:
            newState = { ...state }
            newState.labels[action.labelData.id] = action.labelData
            return newState;
        case UPDATE_LABEL:
            newState = { ...state }
            newState.labels[action.labelId] = action.labelData;
            return newState;
        case DELETE_LABEL:
            newState = { ...state }
            delete newState.labels[action.labelId];
            return newState;
        default:
            return state;
    }
}
