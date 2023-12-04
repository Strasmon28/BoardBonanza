import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCardThunk } from "../../store/cards";
import "./CreateCardModal.css"

function CreateCardModal({ boardId, listId }) {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    if (title === ""){
      newErrors.title = "A title is required";
    }

    // if (selection === 0){
    //   newErrors.selection = "A description is required";
    // }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }

    const board_id = boardId;

    const cardData = {
      title,
      description,
      board_id
    };

    dispatch(createCardThunk(cardData, listId));
    closeModal();

  };

  return (
    <div className="card-form-modal">
      <form className="card-form" onSubmit={handleSubmit}>
      <h3 className="create-card-title">Create card</h3>
      <div className="card-form-title-container">
        <p>Title</p>
        {errors && <p className="error-message">{errors.title}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        
        <div className="card-form-description-container">
        <p>Description</p>
        {errors && <p className="error-message">{errors.selection}</p>}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>


        <button className="card-form-button" type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCardModal;
