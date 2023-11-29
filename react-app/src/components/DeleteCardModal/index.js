import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCardThunk } from "../../store/cards";
import "./DeleteCardModal.css"

function DeleteCardModal({ cardId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCardThunk(cardId))
        closeModal();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="delete-card-modal">
            <h1>Do you want to delete this card?</h1>
            
            <div className="delete-card-buttons-container">
            <button className="delete-card-button" onClick={handleDelete}>Yes, confirm delete</button>
            <button className="delete-card-button" onClick={handleCancel}>No, cancel deletion</button>
            </div>
        </div>
    )
}

export default DeleteCardModal;
