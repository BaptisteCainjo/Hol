import React from "react";
import ButtonBackStyle from "./ButtonBack.module.scss"
import { LuArrowLeft } from "react-icons/lu";

const ButtonBack = ({handleGoBack}) => {
    return <button className={ButtonBackStyle.productBtnBack} onClick={handleGoBack}><LuArrowLeft />Retour</button>
}

export default ButtonBack;