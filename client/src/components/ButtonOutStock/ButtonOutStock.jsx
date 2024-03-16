import React from "react";
import ButtonOutStockStyle from "./ButtonOutStock.module.scss";
import { AiOutlineShopping } from "react-icons/ai";

const ButtonOutStock = () => {

    return (
        <button className={ButtonOutStockStyle.BtnOutStock} disabled>
            <AiOutlineShopping/>
            <span>Rupture de stock</span>
        </button>
    );
}

export default ButtonOutStock;
