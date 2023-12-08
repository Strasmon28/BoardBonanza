//Action Constants ------------------------
const ADD_LABEL = "labels/ADD_LABEL"
const READ_LABELS = "labels/READ_LABELS"
const UPDATE_LABEL = "labels/UPDATE_LABEL"
const DELETE_LABEL = "labels/DELETE_LABEL"

// Action Creators ------------------------
const readLabels = (allLabels) => ({
    type: READ_LABELS,
    allLabels
})

// const readOnelabel = (onelabel) => ({
//     type: READ_ONE_label,
//     onelabel
// })

const addLabel = (labelData) => ({
    type: ADD_LABEL,
    labelData
})

const updateLabel = (labelData, labelId) => ({
    type: UPDATE_LABEL,
    labelData,
    labelId
})

const deleteLabel = (labelId) => ({
    type: DELETE_LABEL,
    labelId
})

// Thunks ----------------------------------

// Gets all labels belonging to a specific board
// Send a boardId to get request
export const getAllLabelsThunk = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/labels/all/${cardId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readLabels(data))  // Sends back all lists to action creator
    } else {
        return "Response Error"
    }
}

// Create a new label
// Send boardId to add to new label board_id
export const createLabelThunk = (labelData, listId) => async (dispatch) => {
    const response = await fetch(`/api/labels/new/${listId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(labelData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addLabel(data))    // Sends back one label to action creator
    } else {
        return "Response Error"
    }
}

// Update an existing label
export const updateLabelThunk = (labelData, labelId) => async (dispatch) => {
    const response = await fetch(`/api/labels/update/${labelId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(labelData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateLabel(data, labelId))    // Sends back one label to action creator
    } else {
        return "Response Error"
    }
}

// Delete a label
export const deleteLabelThunk = (labelId) => async (dispatch) => {
    const response = await fetch(`/api/labels/delete/${labelId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteLabel(labelId))    // Sends back one label to action creator
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
            action.allLabels.labels.forEach(label => {
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
