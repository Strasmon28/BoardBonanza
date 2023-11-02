import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsThunk } from "../../store/boards";
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../CreateBoardModal";

function Dashboard() {
    const dispatch = useDispatch();
    // useSelector of boards state, should return an array
    const boards = useSelector((state) => Object.values(state.boardsState.boards))
    console.log("******the boards", boards)

    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])

    return (
        <>
            <h1>This is the user dashboard</h1>
            {/* <button>+ Create a Board</button> */}
            <OpenModalButton
              buttonText="Create a Board"
              onItemClick={closeMenu}
              modalComponent={<CreateBoardModal />}
            />
            {boards.map((board) => (
                <div key={board.id}className="board-list">
                    <div>{board.id}</div>
                    <div>{board.title}</div>
                    <div>{board.theme}</div>
                </div>
            ))}
        </>
    )
}

export default Dashboard
