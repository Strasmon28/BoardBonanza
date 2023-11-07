import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsThunk } from "../../store/boards";
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../CreateBoardModal";
import "./Dashboard.css";

function Dashboard() {
    const dispatch = useDispatch();
    // useSelector of boards state, should return an array
    // const [showMenu, setShowMenu] = useState(false);
    const boards = useSelector((state) => Object.values(state.boardsState.boards))
    console.log("******the boards", boards)

    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])

    // const closeMenu = () => setShowMenu(false);

    return (
        <>
            <h1>This is the user dashboard</h1>
            {/* <button>+ Create a Board</button> */}

            <div className="board-list">
            <OpenModalButton
              buttonText="Create a Board"
              buttonClassName="create-board-button"
            //   onItemClick={closeMenu}
              modalComponent={<CreateBoardModal />}
            />
            {boards.map((board) => (
                <NavLink
                    key={board.id}
                    to={`/boards/${board.id}`}
                >
                    <div className="single-board">
                        <div>{board.id}</div>
                        <div>{board.title}</div>
                        <div>{board.theme}</div>
                    </div>
                </NavLink>
            ))}
            </div>

        </>
    )
}

export default Dashboard
