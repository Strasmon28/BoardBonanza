import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneBoardThunk } from "../../store/boards";
import { useParams } from "react-router-dom";
import UpdateBoardModal from "../UpdateBoardModal";
import OpenModalButton from "../OpenModalButton";

function BoardDetail() {
    const dispatch = useDispatch();
    const params = useParams()
    const boardId = parseInt(params.id) // Turns params string into number
    const board = useSelector((state) => state.boardsState.singleBoard)
    console.log("****** the board", board)

    useEffect(() => {
        dispatch(getOneBoardThunk(boardId))
    }, [dispatch])

    if (board === undefined || Object.keys(board).length === 0){ // Temp fix
        return <h1>Board not found</h1>
    }

    return (
        <>
            <h1>This is the board detail page</h1>
            <OpenModalButton
              buttonText="Update this Board"
            //   onItemClick={closeMenu}
              modalComponent={<UpdateBoardModal board={board} />}
            />

            <div>{board.id}</div>
            <div>{board.title}</div>
            <div>{board.theme}</div>
            <button>+ Create List</button>
        </>
    )
}

export default BoardDetail
