import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteListThunk } from "../../store/lists";

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
        <>
            <h1>Do you want to delete this list?</h1>
            <h2>This will also delete any cards within it</h2>
            <button onClick={handleDelete}>Yes, confirm delete</button>
            <button onClick={handleCancel}>No, cancel deletion</button>
        </>
    )
}

export default DeleteListModal;
