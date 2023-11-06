import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneBoardThunk } from "../../store/boards";
import { useParams } from "react-router-dom";
import UpdateBoardModal from "../UpdateBoardModal";
import OpenModalButton from "../OpenModalButton";
import DeleteBoardModal from "../DeleteBoardModal";
import CreateListModal from "../CreateListModal";
import { getAllListsThunk } from "../../store/lists";
import "./BoardDetail.css"

function BoardDetail() {
    const dispatch = useDispatch();
    const params = useParams()
    const boardId = parseInt(params.id) // Turns params string into number
    const board = useSelector((state) => state.boardsState.singleBoard)
    let lists = useSelector((state) => Object.values(state.listsState.lists))
    console.log("****** the board", board)
    console.log("****** the lists", lists)

    useEffect(() => {
        dispatch(getOneBoardThunk(boardId))
        dispatch(getAllListsThunk(boardId))
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

            <OpenModalButton
              buttonText="Delete this Board"
            //   onItemClick={closeMenu}
              modalComponent={<DeleteBoardModal boardId={board.id} />}
            />

            <div>{board.id}</div>
            <div>{board.title}</div>
            <div>{board.theme}</div>

          <div className="all-lists-container">
            {lists && lists.map((list) => (
              <div key={list.id} className="single-list">
                <div>{list.title}</div>
                <button>+ Create a card</button>
              </div>
            ))}
          </div>
            <OpenModalButton
              buttonText="+ Create List"
            //   onItemClick={closeMenu}
              modalComponent={<CreateListModal boardId={boardId} />}
            />
            {/* <button>+ Create List</button> */}

        </>
    )
}

export default BoardDetail
