import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateLabelThunk } from "../../store/labels";
import "./UpdateLabelModal.css"

function UpdateLabelModal({ boardId, labelId }) {
  const dispatch = useDispatch();

  // const [user_id, setUser_id] = useState(0)
  const [comment, setComment] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState({});
  const [selection, setSelection] = useState(0);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}

    setComment("Placeholder")

    if (comment === ""){
      newErrors.comment = "A comment is required";
    }

    if (selection === 0){
      newErrors.selection = "A color selection is required";
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }

    const board_id = boardId;

    const labelData = {
      comment,
      board_id,
      color
    };

    dispatch(updateLabelThunk(labelData, labelId));
    closeModal();

  };

  const selectColor = (chosenColor, selectNum) => {
    setColor(chosenColor);
    setSelection(selectNum);
  }

  return (
    <div className="label-form-modal">
      <form className="label-form" onSubmit={handleSubmit}>
      <h3 className="update-label-title">Update Label</h3>
        <div className="label-form-color-container">
        <p>Color</p>
        {errors && <p className="error-message">{errors.selection}</p>}
        {/* <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        /> */}

        <div className="color-select-container">
          <div className={selection === 1 ? "red-select chosen" : "red-select"} onClick={() => selectColor("red", 1)}>
          </div>

          <div className={selection === 2 ? "yellow-select chosen" : "yellow-select"} onClick={() => selectColor("yellow", 2)}>
          </div>

          <div className={selection === 3 ? "green-select chosen" : "green-select"} onClick={() => selectColor("green", 3)}>
          </div>

        </div>
        </div>

        {/* <div className="label-form-comment-container">
        <p>Comment</p>
        {errors && <p className="error-message">{errors.comment}</p>}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        </div> */}

        <button className="label-form-button" type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateLabelModal;
