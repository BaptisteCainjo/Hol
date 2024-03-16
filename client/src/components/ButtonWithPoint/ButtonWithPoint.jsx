import ButtonWithPointStyle from "./ButtonWithPoint.module.scss";
import { LuArrowRight } from "react-icons/lu";



const BoutonWithPoint = ({ color, text, onClick }) => {

    const getDotStyle = () => {
        // Vous pouvez ajouter d'autres couleurs en fonction de vos besoins
        switch (color) {
            case 'ORANGE':
                return ButtonWithPointStyle.OrangeDot;
            case 'BLACK':
                return ButtonWithPointStyle.BlackDot;
            case 'WHITE':
                return ButtonWithPointStyle.WhiteDot;
            default:
                return ButtonWithPointStyle.DefaultDot;
        }
    };

    return (
        <a type="submit" className={`${ButtonWithPointStyle.PopupConnectBtn} ${getDotStyle()}`} onClick={onClick}>
            <span className={ButtonWithPointStyle.PopupConnectBtnDot}></span>
            <span className={ButtonWithPointStyle.PopupConnectBtnTexte}>{text}</span>
            <span className={ButtonWithPointStyle.PopupConnectBtnArrow}>
                <LuArrowRight />
            </span>
        </a>
    );
}

export default BoutonWithPoint;