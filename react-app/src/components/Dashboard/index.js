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
    // console.log("******the boards", boards)

    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])

    // const closeMenu = () => setShowMenu(false);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">My Dashboard</h1>
            <h3 className="dashboard-subtitle">Create a new board or select an existing board</h3>
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
                    className="dashboard-board-links"
                >
                    <div className={"dashboard-single-board" + ` ${board.theme}`}>
                        {/* <div>{board.id} (placeholder)</div> */}
                        <div className="dashboard-board-title">{board.title}</div>
                        {/* <div>{board.theme} (theme name)</div> */}
                    </div>
                </NavLink>
            ))}
            </div>

        </div>
    )
}

export default Dashboard
