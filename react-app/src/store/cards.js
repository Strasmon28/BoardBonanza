//Action Constants ------------------------
const ADD_CARD = "cards/ADD_CARD"
const READ_CARDS = "cards/READ_CARDS"
const UPDATE_CARD = "cards/UPDATE_CARD"
const DELETE_CARD = "cards/DELETE_CARD"

// Action Creators ------------------------
const readCards = (allCards) => ({
    type: READ_CARDS,
    allLists
})

// const readOneList = (oneList) => ({
//     type: READ_ONE_LIST,
//     oneList
// })

const addCard = (cardData) => ({
    type: ADD_LIST,
    listData
})

const updateCards = (cardData, cardId) => ({
    type: UPDATE_CARD,
    cardData,
    cardId
})

const deleteCard = (cardId) => ({
    type: DELETE_CARD,
    cardId
})

// Thunks ----------------------------------


// Reducer -------------------------------------
const initialState = { cards: {} }
export default function listsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_CARDS:
            newState = { ...state, lists: {} }
            action.allLists.lists.forEach(list => {
                newState.lists[list.id] = list
            });
            return newState;
        // case READ_ONE_LIST:
        //     newState = { ...state }
        //     newState.singleList = action.oneList;
        //     return newState;
        case ADD_CARD:
            newState = { ...state }
            newState.lists[action.listData.id] = action.listData
            return newState;
        case UPDATE_CARD:
            newState = { ...state }
            newState.lists[action.listId] = action.listData;
            return newState;
        case DELETE_CARD:
            newState = { ...state }
            delete newState.lists[action.listId];
            return newState;
        default:
            return state;
    }
}
