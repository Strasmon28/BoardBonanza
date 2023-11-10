import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneBoardThunk } from "../../store/boards";
import { useParams } from "react-router-dom";
import UpdateBoardModal from "../UpdateBoardModal";
import OpenModalButton from "../OpenModalButton";
import DeleteBoardModal from "../DeleteBoardModal";
import CreateListModal from "../CreateListModal";
import UpdateListModal from "../UpdateListModal";
import { getAllListsThunk } from "../../store/lists";
import "./BoardDetail.css"
import DeleteListModal from "../DeleteListModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function BoardDetail() {
    const dispatch = useDispatch();
    const params = useParams()
    const boardId = parseInt(params.id) // Turns params string into number
    const board = useSelector((state) => state.boardsState.singleBoard)
    const lists = useSelector((state) => Object.values(state.listsState.lists))

    // const [theme, setTheme] = useState(board?.theme);
    const theme = board?.theme
    // console.log("****** the board", board)
    // console.log("****** the lists", lists)

    useEffect(() => {
        dispatch(getOneBoardThunk(boardId))
        dispatch(getAllListsThunk(boardId))
    }, [dispatch])

    if (board === undefined || Object.keys(board).length === 0){ // Temp fix
        return <h1>Board not found</h1>
    }

    return (
        <div className={theme}>
          <div className="board-title-container">
            <h1 className="board-title">{board.title}</h1>

            {/* <NavLink to={"/boards"}>
              <button>Back to my boards</button>
            </NavLink> */}
            <div className="board-buttons-container">
            <OpenModalButton
              buttonText="Update this Board"
              buttonClassName={"details-board-button"}
            //   onItemClick={closeMenu}
              modalComponent={<UpdateBoardModal board={board} />}
            />

            <OpenModalButton
              buttonText="Delete this Board"
              buttonClassName={"details-board-button"}
            //   onItemClick={closeMenu}
              modalComponent={<DeleteBoardModal boardId={board.id} />}
            />
            </div>
          </div>
            {/* <div>{board.id}</div> */}
            {/* <h2>{board.title}</h2> */}
            {/* <div>{board.theme}</div> */}

          <div className="all-lists-container">
            {lists && lists.map((list) => (
              <div key={list.id} className={'single-list' + ` ${list.cover}`}>
                <div className="list-title-container">
                  <div className="list-title">{list.title}</div>
                  <div className="list-buttons">
                  <OpenModalButton
                    buttonText="Update"
                    //   onItemClick={closeMenu}
                    buttonClassName="details-list-button"
                    modalComponent={<UpdateListModal list={list} boardId={board.id} />}
                  />
                  <OpenModalButton
                    buttonText="Delete"
                    //   onItemClick={closeMenu}
                    buttonClassName="details-list-button"
                    modalComponent={<DeleteListModal listId={list.id}  />}
                  />
                  </div>
                  </div>
                {/* <button>+ Create a card (WIP)</button> */}
              </div>
            ))}

            <OpenModalButton
              buttonText="+ Create List"
            //   onItemClick={closeMenu}
              buttonClassName="create-list-button"
              modalComponent={<CreateListModal boardId={boardId} />}
            />
          </div>


            {/* <button>+ Create List</button> */}

        </div>
    )
}

export default BoardDetail
