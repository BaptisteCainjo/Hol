import MenuBurgerStyle from "./MenuBurger.module.scss"
import basket from "../../assets/svg/icons/basket.svg";
import { LuArrowRight } from "react-icons/lu";
import { LuUser } from "react-icons/lu";

const MenuBurger = () => {

    return (

        <div className={MenuBurgerStyle.navbarMenuResponsiveContainer}>
            <div className={MenuBurgerStyle.navbarMenuResponsiveTitleContainer}>
                <span className={MenuBurgerStyle.navbarMenuTitle}>Les halles.</span>
            </div>
            <div className={MenuBurgerStyle.navbarMenuResponsiveIdentifier}>
                <LuUser />
                <p>S'identifier</p>
                <LuArrowRight className={MenuBurgerStyle.navbarMenuResponsiveArrow} />
            </div>
            <div className={MenuBurgerStyle.navbarMenuResponsivePanier}>
                <img className={MenuBurgerStyle.navbarMenuBasket} src={basket} alt="Icône panier" />
                <p>Panier</p>
                <LuArrowRight className={MenuBurgerStyle.navbarMenuResponsiveArrow} />
            </div>
        </div>
    );
}

export default MenuBurger;