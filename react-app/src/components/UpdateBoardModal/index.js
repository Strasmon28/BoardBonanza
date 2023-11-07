import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateBoardThunk } from "../../store/boards";
import "./UpdateBoardModal.css"

function UpdateBoardModal({ board }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(board?.title);
  const [theme, setTheme] = useState(board?.theme);
  const [selection, setSelection] = useState(0);
  // const [currentSelection, setCurrentSelection] = useState(0);
  const { closeModal } = useModal();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const boardData = {
        title,
        theme
    };
    dispatch(updateBoardThunk(boardData, board.id));
    closeModal()
  };

  const selectTheme = (chosenTheme, selectNum) => {
    setTheme(chosenTheme);
    setSelection(selectNum)
  }

  console.log("Chosen theme", theme)
  return (
    <>
      <form onSubmit={handleUpdate}>
        <p>Theme</p>
        {/* <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        /> */}
        <div className="theme-select-container">
          <div className={selection === 1 ? "orange-select chosen" : "orange-select"} onClick={() => selectTheme("orange", 1)}>
          </div>

          <div className={selection === 2 ? "storm-select chosen" : "storm-select"} onClick={() => selectTheme("storm", 2)}>
          </div>

          <div className={selection === 3 ? "grass-select chosen" : "grass-select"} onClick={() => selectTheme("grass", 3)}>
          </div>

        </div>
        <p>Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Update Board</button>
      </form>
    </>
  );
}

export default UpdateBoardModal;
