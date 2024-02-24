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
  const [errors, setErrors] = useState({});
  // const [currentSelection, setCurrentSelection] = useState(0);
  const { closeModal } = useModal();

  const handleUpdate = async (e) => {
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
    dispatch(updateBoardThunk(boardData, board.id));
    closeModal()
  };

  const selectTheme = (chosenTheme, selectNum) => {
    setTheme(chosenTheme);
    setSelection(selectNum)
  }

  console.log("Chosen theme", theme)
  return (
    <div className="update-board-modal">
      <form className="update-board-form" onSubmit={handleUpdate}>
        <h3 className="update-board-title">Update Board</h3>
        <div className="update-board-title-container">
        <p>Theme</p>
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

          <div className={selection === 4 ? "purple-select chosen" : "purple-select"} onClick={() => selectTheme("purple", 4)}>
          </div>

        </div>
        </div>

        <div className="update-board-title-container">
        <p>Title</p>
        {errors && <p className="error-message">{errors.title}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <button className="confirm-update-board-button" type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateBoardModal;
