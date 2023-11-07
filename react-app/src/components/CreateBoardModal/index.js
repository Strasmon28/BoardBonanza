import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createBoardThunk } from "../../store/boards";
import { useHistory } from "react-router-dom";

function CreateBoardModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [selection, setSelection] = useState(0);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      theme
    };

    const newBoard = await dispatch(createBoardThunk(boardData));

    closeModal();
    history.push(`/boards/${newBoard.id}`)
  };

  const selectTheme = (chosenTheme, selectNum) => {
    setTheme(chosenTheme);
    setSelection(selectNum)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Board</button>
      </form>
    </>
  );
}

export default CreateBoardModal;
