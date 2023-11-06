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

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Board</button>
      </form>
    </>
  );
}

export default CreateBoardModal;
