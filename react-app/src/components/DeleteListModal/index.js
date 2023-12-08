import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteListThunk } from "../../store/lists";
import "./DeleteListModal.css"

function DeleteListModal({ listId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteListThunk(listId))
        closeModal();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className="delete-list-modal">
            <h1>Do you want to delete this list?</h1>
            <h2 className="delete-list-subtitle">This will also delete any cards within it</h2>
            <div className="delete-list-buttons-container">
            <button className="delete-list-button" onClick={handleDelete}>Yes, confirm delete</button>
            <button className="delete-list-button" onClick={handleCancel}>No, cancel deletion</button>
            </div>
        </div>
    )
}

export default DeleteListModal;
