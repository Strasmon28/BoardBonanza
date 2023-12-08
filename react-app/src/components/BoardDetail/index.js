import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneBoardThunk } from "../../store/boards";
import { useParams } from "react-router-dom";
import UpdateBoardModal from "../UpdateBoardModal";
import OpenModalButton from "../OpenModalButton";
import DeleteBoardModal from "../DeleteBoardModal";
import CreateListModal from "../CreateListModal";
import UpdateListModal from "../UpdateListModal";
import CreateCardModal from "../CreateCardModal";
import UpdateCardModal from "../UpdateCardModal";
import DeleteCardModal from "../DeleteCardModal";
import CreateLabelModal from "../CreateLabelModal";
import UpdateLabelModal from "../UpdateLabelModal";
import { getAllListsThunk } from "../../store/lists";
import "./BoardDetail.css";
import DeleteListModal from "../DeleteListModal";
// import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getAllCardsThunk } from "../../store/cards";
import { getAllLabelsThunk } from "../../store/labels";
// import CardDetailModal from "../CardDetailModal";
import DeleteLabelModal from "../DeleteLabelModal";

function BoardDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const boardId = parseInt(params.id); // Turns params string into number
  const board = useSelector((state) => state.boardsState.singleBoard);
  const lists = useSelector((state) => Object.values(state.listsState.lists));
  const cards = useSelector((state) => Object.values(state.cardsState.cards));
  const labels = useSelector((state) => Object.values(state.labelsState.labels));
  console.log("****** the labels", labels);
  // const [theme, setTheme] = useState(board?.theme);
  const theme = board?.theme;
  console.log("****** the cards", cards)
  // console.log("****** the lists", lists)

  useEffect(() => {
    dispatch(getOneBoardThunk(boardId));
    dispatch(getAllListsThunk(boardId));
    dispatch(getAllCardsThunk(boardId));
    dispatch(getAllLabelsThunk(boardId));
  }, [dispatch]);

  // console.log("FILTERED", labels.filter((label) => label.card_id === 2)[0].color)
  if (board === undefined || Object.keys(board).length === 0) {
    // Temp fix
    return <h1>Board not found</h1>;
  }

  // if (cards === undefined || cards.length === 0) {
  //   return <h1>Loading</h1>;
  // }

  return (
    <div className={"color-" + theme}>
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

      <div className="all-lists-container">
        {lists &&
          lists.map((list) => (
            <div key={list.id} className={"single-list" + ` ${list.cover}`}>
              <div className="list-title-container">
                <div className="list-title">{list.title}</div>
                <div className="list-buttons">
                  <OpenModalButton
                    buttonText="Update"
                    //   onItemClick={closeMenu}
                    buttonClassName="details-list-button"
                    modalComponent={
                      <UpdateListModal list={list} boardId={board.id} />
                    }
                  />
                  <OpenModalButton
                    buttonText="Delete"
                    //   onItemClick={closeMenu}
                    buttonClassName="details-list-button"
                    modalComponent={<DeleteListModal listId={list.id} />}
                  />
                </div>
              </div>

              {/* CARDS WITHIN THE LIST */}
              <div className="cards-container">
                {cards &&
                  cards
                    .filter((card) => card.list_id === list.id)
                    .map((card) => (
                      <div key={card.id} className="single-card">
                        <div className="label-details">
                        {labels.filter((label) => label.card_id === card.id).length > 0 ? labels.filter((label) => label.card_id === card.id).map((label) => (
                        <div key={label.id} className="label-container">
                        <p className={"label-color" + ` ${label.color}`}></p>
                        <div className="label-buttons">
                        <OpenModalButton
                        buttonText="Edit"
                        //   onItemClick={closeMenu}
                        buttonClassName="details-card-button"
                        modalComponent={
                          <UpdateLabelModal
                            boardId={board.id}
                            labelId={label.id}
                          />
                        }
                        />
                        <OpenModalButton
                        buttonText="Delete"
                        //   onItemClick={closeMenu}
                        buttonClassName="details-card-button"
                        modalComponent={
                          <DeleteLabelModal
                            labelId={label.id}
                          />
                        }
                        />
                        </div>
                        </div>
                        ))[0]
                        :
                        <OpenModalButton
                        buttonText="Create Label"
                        //   onItemClick={closeMenu}
                        buttonClassName="details-card-button"
                        modalComponent={
                          <CreateLabelModal
                            boardId={board.id}
                            cardId={card.id}
                          />
                        }
                        />
                        }
                        {/* <OpenModalButton
                          buttonText="Details"
                          //   onItemClick={closeMenu}
                          buttonClassName="details-card-button"
                          modalComponent={
                            <CardDetailModal cardTitle={card.title} cardDescription={card.description} />
                          }
                          /> */}
                          </div>
                        <div className="card-title-buttons">
                          <h4>{card.title}</h4>
                          <div className="card-buttons-container">
                            <OpenModalButton
                              buttonText="Edit"
                              //   onItemClick={closeMenu}
                              buttonClassName="details-card-button"
                              modalComponent={
                                <UpdateCardModal
                                  boardId={board.id}
                                  cardId={card.id}
                                />
                              }
                            />
                            <OpenModalButton
                              buttonText="Delete"
                              //   onItemClick={closeMenu}
                              buttonClassName="details-card-button"
                              modalComponent={
                                <DeleteCardModal cardId={card.id} />
                              }
                            />
                          </div>
                        </div>
                        <p>{card.description}</p>
                      </div>
                    ))}
                <OpenModalButton
                  buttonText="+ Create Card"
                  //   onItemClick={closeMenu}
                  buttonClassName="new-card-button"
                  modalComponent={
                    <CreateCardModal boardId={boardId} listId={list.id} />
                  }
                />
              </div>
            </div>
          ))}
        <div className="list-button-container">
        <OpenModalButton
          buttonText="+ Create List"
          //   onItemClick={closeMenu}
          buttonClassName="create-list-button"
          modalComponent={<CreateListModal boardId={boardId} />}
        />
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
