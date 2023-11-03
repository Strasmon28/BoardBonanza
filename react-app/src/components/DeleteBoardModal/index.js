import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteBoardThunk } from "../../store/boards";


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
        <>
            <h1>Do you want to delete this board?</h1>
            <h2>Warning: *this is irreversable*</h2>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleCancel}>No, cancel delete</button>
        </>
    )
}

export default DeleteBoardModal;
