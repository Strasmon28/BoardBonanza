import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createBoardThunk } from "../../store/boards";

function CreateBoardModal() {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      theme
    };
    dispatch(createBoardThunk(boardData));
    closeModal();
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
