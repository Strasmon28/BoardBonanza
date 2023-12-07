import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteLabelThunk } from "../../store/labels";
import "./DeleteLabelModal.css"

function DeleteLabelModal({ labelId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteLabelThunk(labelId))
        closeModal();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="delete-label-modal">
            <h1>Do you want to delete this label?</h1>

            <div className="delete-label-buttons-container">
            <button className="delete-label-button" onClick={handleDelete}>Yes, confirm delete</button>
            <button className="delete-label-button" onClick={handleCancel}>No, cancel deletion</button>
            </div>
        </div>
    )
}

export default DeleteLabelModal;
