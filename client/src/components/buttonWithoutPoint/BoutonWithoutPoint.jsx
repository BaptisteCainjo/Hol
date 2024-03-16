import BoutonWithPointStyle from "./BoutonWithoutPoint.module.scss";

const BoutonWithoutPoint = ({ text, onClick }) => {

    return (
        <button className={BoutonWithPointStyle.BtnNoPoint} onClick={onClick}>
            <span className={BoutonWithPointStyle.BtnNoPointDot}></span>
            <span className={BoutonWithPointStyle.BtnNoPointTexte}>{text}</span>
        </button>
    );
}

export default BoutonWithoutPoint;