//Action Constants ------------------------
const ADD_CARD = "cards/ADD_CARD"
const READ_CARDS = "cards/READ_CARDS"
const UPDATE_CARD = "cards/UPDATE_CARD"
const DELETE_CARD = "cards/DELETE_CARD"

// Action Creators ------------------------
const readCards = (allCards) => ({
    type: READ_CARDS,
    allcards
})

// const readOnecard = (onecard) => ({
//     type: READ_ONE_card,
//     onecard
// })

const addCard = (cardData) => ({
    type: ADD_CARD,
    cardData
})

const updateCard = (cardData, cardId) => ({
    type: UPDATE_CARD,
    cardData,
    cardId
})

const deleteCard = (cardId) => ({
    type: DELETE_CARD,
    cardId
})

// Thunks ----------------------------------

// Gets all cards belonging to a specific board
// Send a boardId to get request
export const getAllCardsThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/lists/all/${boardId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readCards(data))  // Sends back all lists to action creator
    } else {
        return "Response Error"
    }
}

// Create a new card
// Send boardId to add to new card board_id
export const createCardThunk = (cardData, listId) => async (dispatch) => {
    const response = await fetch(`/api/cards/new/${listId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addCard(data))    // Sends back one card to action creator
    } else {
        return "Response Error"
    }
}

// Update an existing card
export const updateCardThunk = (cardData, cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/update/${cardId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateCard(data, cardId))    // Sends back one card to action creator
    } else {
        return "Response Error"
    }
}

// Delete a card
export const deleteCardThunk = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/delete/${cardId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteCard(cardId))    // Sends back one card to action creator
        return "Deleted"
    } else {
        return "Response Error"
    }
}

// Reducer -------------------------------------
const initialState = { cards: {} }
export default function cardsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_CARDS:
            newState = { ...state, cards: {} }
            action.allcards.cards.forEach(card => {
                newState.cards[card.id] = card
            });
            return newState;
        // case READ_ONE_card:
        //     newState = { ...state }
        //     newState.singlecard = action.onecard;
        //     return newState;
        case ADD_CARD:
            newState = { ...state }
            newState.cards[action.cardData.id] = action.cardData
            return newState;
        case UPDATE_CARD:
            newState = { ...state }
            newState.cards[action.cardId] = action.cardData;
            return newState;
        case DELETE_CARD:
            newState = { ...state }
            delete newState.cards[action.cardId];
            return newState;
        default:
            return state;
    }
}
