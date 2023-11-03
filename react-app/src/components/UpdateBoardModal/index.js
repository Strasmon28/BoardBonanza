import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateBoardThunk } from "../../store/boards";

function UpdateBoardModal({ board }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(board?.title);
  const [theme, setTheme] = useState(board?.theme);
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

  return (
    <>
      <form onSubmit={handleUpdate}>
        <p>Theme</p>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />

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
