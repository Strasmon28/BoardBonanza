import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneBoardThunk } from "../../store/boards";
import CreateLabelModal from "../CreateLabelModal";
import UpdateLabelModal from "../UpdateLabelModal";
import DeleteLabelModal from "../DeleteLabelModal";

function CardDetailModal({cardTitle, cardDescription}) {
    return(
        <div className="card-details">
            <h2>{cardTitle}</h2>
            <h5>{cardDescription}</h5>

        </div>
    )
}

export default CardDetailModal;
