import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function DeleteBoardModal({ boardId }){


    const { closeModal } = useModal();
    const handleDelete = (e) => {
        e.preventDefault();
        
    }
    return (
        <>
            <h1>Do you want to delete this board?</h1>
            <button onClick={handleDelete}>Yes *this is irreversable*</button>
            <button onClick={handleCancel}>No, cancel delete</button>
        </>
    )
}

export default DeleteBoardModal;
