import React from "react";
import HelpStyle from "./Help.module.scss"
import { MdQuestionMark } from "react-icons/md";
import { Link } from "react-router-dom";

const Help = () => {
    return <div className={HelpStyle.containerHelpIcon}>
        <Link to={"/"} className={`${HelpStyle.questionMark} ${HelpStyle.icon}`}>
            <MdQuestionMark/>
        </Link>
    </div>
}

export default Help;