import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteBoardThunk } from "../../store/boards";
import "./DeleteBoardModal.css"

function DeleteBoardModal({ boardId }){
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteBoardThunk(boardId));
        closeModal();
        history.push('/boards')
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal();
    }

    return (
        <div className="delete-board-modal">
            <h1>Do you want to delete this board?</h1>
            <h2>Warning: *this is irreversable*</h2>
            <div className="delete-board-buttons-container">
            <button className="delete-board-button" onClick={handleDelete}>Yes</button>
            <button className="delete-board-button" onClick={handleCancel}>No, cancel delete</button>
            </div>
        </div>
    )
}

export default DeleteBoardModal;
