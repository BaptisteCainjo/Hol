import ButtonSubmitWithPointStyle from "./ButtonSubmitWithPoint.module.scss";
import { LuArrowRight } from "react-icons/lu";



const BoutonWithPoint = ({ color, text, onClick }) => {

    const getDotStyle = () => {
        // Vous pouvez ajouter d'autres couleurs en fonction de vos besoins
        switch (color) {
            case 'ORANGE':
                return ButtonSubmitWithPointStyle.OrangeDot;
            case 'BLACK':
                return ButtonSubmitWithPointStyle.BlackDot;
            case 'WHITE':
                return ButtonSubmitWithPointStyle.WhiteDot;
            default:
                return ButtonSubmitWithPointStyle.DefaultDot;
        }
    };

    return (
        <button type="submit" className={`${ButtonSubmitWithPointStyle.PopupConnectBtn} ${getDotStyle()}`} onClick={onClick}>
            <span className={ButtonSubmitWithPointStyle.PopupConnectBtnDot}></span>
            <span className={ButtonSubmitWithPointStyle.PopupConnectBtnTexte}>{text}</span>
            <span className={ButtonSubmitWithPointStyle.PopupConnectBtnArrow}>
                <LuArrowRight />
            </span>
        </button>
    );
}

export default BoutonWithPoint;