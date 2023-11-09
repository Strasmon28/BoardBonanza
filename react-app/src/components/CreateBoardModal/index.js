import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createBoardThunk } from "../../store/boards";
import { useHistory } from "react-router-dom";
import './CreateBoardModal.css'

function CreateBoardModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [selection, setSelection] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    if (title === ""){
      newErrors.title = "A title is required";
    }

    if (selection === 0){
      newErrors.selection = "A theme selection is required";
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }


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
    <div className="create-board-modal">
      <form className="create-board-form" onSubmit={handleSubmit}>
      <div className="create-board-theme-container">
        <p className="create-board-title">Theme</p>
        {errors && <p className="error-message">{errors.selection}</p>}
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
      </div>

      <div className="create-board-title-container">
        <p className="create-board-title">Title</p>
        {errors && <p className="error-message">{errors.title}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
        <button className="confirm-create-board-button" type="submit">Create Board</button>
      </form>
    </div>
  );
}

export default CreateBoardModal;
