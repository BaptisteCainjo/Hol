import React from "react";
import ButtonAddBasketStyle from "./ButtonAddBasket.module.scss";
import {AiOutlineShopping} from "react-icons/ai";

const ButtonAddBasket = ({action}) => {

    return (
        <button onClick={action} className={ButtonAddBasketStyle.BtnAddToCart}>
            <AiOutlineShopping/>
            <span>Réserver le produit</span>
        </button>
    );
}

export default ButtonAddBasket;