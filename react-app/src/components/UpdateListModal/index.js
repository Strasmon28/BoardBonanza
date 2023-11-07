import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateListThunk } from "../../store/lists";
import "./UpdateListModal.css";

function UpdateListModal({ list, boardId }) {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [title, setTitle] = useState(list?.title);
  const [cover, setCover] = useState(list?.cover);
  const [selection, setSelection] = useState(0);
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

  const selectCover = (chosenCover, selectNum) => {
    setCover(chosenCover);
    setSelection(selectNum);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Cover</p>
        {/* <input
          type="text"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        /> */}
        <div className="cover-select-container">
          <div className={selection === 1 ? "flower-select chosen" : "flower-select"} onClick={() => selectCover("flower", 1)}>
          </div>

          <div className={selection === 2 ? "starry-select chosen" : "starry-select"} onClick={() => selectCover("starry", 2)}>
          </div>

          {/* <div className={selection === 3 ? "grass-select chosen" : "grass-select"} onClick={() => selectCover("grass", 3)}>
          </div> */}

        </div>

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
