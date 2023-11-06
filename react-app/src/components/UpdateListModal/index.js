import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateListThunk } from "../../store/lists";

function UpdateListModal({ list, boardId }) {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [title, setTitle] = useState(list?.title);
  const [cover, setCover] = useState(list?.cover);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listData = {
      title,
      cover
    };
    dispatch(updateListThunk(listData, list.id));
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Cover</p>
        <input
          type="text"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <p>Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Update List</button>
      </form>
    </>
  );
}

export default UpdateListModal;
