import React from "react";
import PopupChoiceStyle from "./PopupChoice.module.scss"

const PopupChoice = ({functionButton1, functionButton2, textTitle, textQuestion, textButton1, textButton2}) => {
    console.log("yo")
    
    return  <div className={PopupChoiceStyle.popupContainer}>
    <button onClick={functionButton1} className={PopupChoiceStyle.popupBackground}></button>
    <div className={PopupChoiceStyle.popupContent}>
        <h2>{textTitle}</h2>
        <p>{textQuestion}</p>
        <div className={PopupChoiceStyle.popupBtns}>
            <button className={`${PopupChoiceStyle.btnDialog} ${PopupChoiceStyle.dialogCancel}`} onClick={functionButton1}>{textButton1}</button>
            <button className={`${PopupChoiceStyle.btnDialog} ${PopupChoiceStyle.dialogConfirm}`} onClick={functionButton2}>{textButton2}</button>
        </div>
    </div>
</div>
}

export default PopupChoice;