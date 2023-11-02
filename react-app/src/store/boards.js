// Action Constants ------------------------
const READ_BOARDS = "boards/READ_BOARDS"
const READ_ONE_BOARD = "boards/READ_ONE_BOARD"
const ADD_BOARD = 'boards/ADD_BOARD'

// Action Creators ------------------------
const readBoards = (allBoards) => ({
    type: READ_BOARDS,
    allBoards
})

const readOneBoard = (oneBoard) => ({
    type: READ_ONE_BOARD,
    oneBoard
})

const addBoard = (boardData) => ({
    type: ADD_BOARD,
    boardData
})

// Thunks ----------------------------------
// Get all the boards
export const getAllBoardsThunk = () => async (dispatch) => {
    const response = await fetch('/api/boards', {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readBoards(data))  // Sends back all boards to action creator
    } else {
        return "Response Error"
    }
}

// Get one board
export const getOneBoardThunk = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readOneBoard(data))    // Sends back one board to action creator
    } else {
        return "Response Error"
    }
}

// Create a new board
export const createBoardThunk = (boardData) => async (dispatch) => {
    const response = await fetch(`/api/boards/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(boardData)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addBoard(data))    // Sends back one board to action creator
    } else {
        return "Response Error"
    }
}

// Reducer -------------------------------------
const initialState = { boards: {}, singleBoard: {} }
export default function boardsReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case READ_BOARDS:
            newState = { ...state, boards: {} }
            action.allBoards.boards.forEach(board => {
                newState.boards[board.id] = board
            });
            return newState;
        case READ_ONE_BOARD:
            newState = { ...state }
            newState.singleBoard = action.oneBoard;
            return newState;
        case ADD_BOARD:

        default:
            return state
    }
}
