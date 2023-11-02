import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createBoardThunk } from "../../store/boards";

function CreateBoardModal() {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title,
      theme,
    };
    dispatch(createBoardThunk(boardData));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Theme</p>
        <input
          type="text"
          value={theme}
          onchange={(e) => setTheme(e.target.value)}
        />

        <p>Title</p>
        <input
          type="text"
          value={title}
          onchange={(e) => setTitle(e.target.value)}
        />
      </form>
    </>
  );
}

export default CreateBoardModal;
