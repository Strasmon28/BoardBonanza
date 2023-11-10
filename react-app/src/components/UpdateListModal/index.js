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
  const [errors, setErrors] = useState({});
  const [selection, setSelection] = useState(0);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    if (title === ""){
      newErrors.title = "A title is required";
    }

    if (selection === 0){
      newErrors.selection = "A cover selection is required";
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }

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
    <div className="list-form-modal">
      <form className="list-form" onSubmit={handleSubmit}>
        <div className="list-form-cover-container">
        <p>Cover</p>
        {errors && <p className="error-message">{errors.selection}</p>}
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
        </div>

        <div className="list-form-title-container">
        <p>Title</p>
        {errors && <p className="error-message">{errors.title}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <button className="list-form-button" type="submit">Update List</button>
      </form>
    </div>
  );
}

export default UpdateListModal;
