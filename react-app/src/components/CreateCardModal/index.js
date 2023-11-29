import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCardThunk } from "../../store/cards";
import "./CreatecardModal.css"

function CreateCardModal({ boardId, listId }) {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [title, setTitle] = useState("");
  const [descrption, setDescrption] = useState("");
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
      newErrors.selection = "A descrption selection is required";
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }

    const board_id = boardId;
    
    const cardData = {
      title,
      descrption,
      board_id
    };

    dispatch(createCardThunk(cardData, listId));
    closeModal();

  };

  return (
    <div className="card-form-modal">
      <form className="card-form" onSubmit={handleSubmit}>
      <h3 className="create-card-title">Create card</h3>
        <div className="card-form-descrption-container">
        <p>Descrption</p>
        {errors && <p className="error-message">{errors.selection}</p>}
        <input
          type="text"
          value={descrption}
          onChange={(e) => setDescrption(e.target.value)}
        />
        </div>

        <div className="card-form-title-container">
        <p>Title</p>
        {errors && <p className="error-message">{errors.title}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <button className="card-form-button" type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCardModal;
