import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/svg/logos/logo_noir.svg";
import basket from "../../assets/svg/icons/basket.svg";
import NavbarStyle from "./Navbar.module.scss";
import { useState } from "react";
import BoutonWithoutPoint from "../buttonWithoutPoint/BoutonWithoutPoint";
import useSession from "../../utils/hooks/useSession.js";
import { LuUser, LuUserCog } from "react-icons/lu";
import { AiOutlineShop, AiOutlineShopping } from "react-icons/ai";
import PopupConnexion from "../PopupConnexion/PopupConnexion"

const Navbar = () => {
    const { user } = useSession();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMenuBurgerOpen, setIsMenuBurgerOpen] = useState(false);
    const sampleLocation = useLocation();

    const handlePopupToggle = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const currentLocation = () => {
        let value;
        switch (sampleLocation.pathname) {
            case "/marketplace":
                value = NavbarStyle.marketplace;
                break;
            default:
                value = ""
        }
        return value;
    };

    const handleMenuBurger = () => {
        setIsMenuBurgerOpen(!isMenuBurgerOpen);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className={currentLocation()}>
            <nav className={`${NavbarStyle.navbar} ${currentLocation()}`} >
                <NavLink onClick={scrollToTop} to="/" className={NavbarStyle.navbarLogo}><img src={logo} alt="Logo de l'application" /></NavLink>
                <div className={NavbarStyle.navbarMenu}>
                    <NavLink onClick={scrollToTop} to={"/marketplace"} refresh="true"><span className={`${NavbarStyle.navbarMenuTitre} ${sampleLocation.pathname === "/marketplace" ? NavbarStyle.current : ""}`}>Les halles.</span></NavLink>
                    {user && user.role === "artisan" ? <NavLink to={"/admin"} refresh="true">
                        <span className={`${NavbarStyle.navbarMenuTitre} ${sampleLocation.pathname === "/admin" ? NavbarStyle.current : ""}`}><AiOutlineShop /><span>Ma boutique</span></span>
                    </NavLink> : ""}
                    {/*sampleLocation.pathname !== "/marketplace" && <SearchBar classContainer={NavbarStyle.searcBarContainer} />*/}
                    {user ? (
                        <NavLink onClick={scrollToTop} className={`${NavbarStyle.navbarMenuProfil} ${sampleLocation.pathname === "/profil" ? NavbarStyle.current : ""}`} to={"/profil"} refresh="true"><LuUserCog /></NavLink>
                    ) : (<div className={NavbarStyle.containerBtnAccount}>
                        <BoutonWithoutPoint onClick={handlePopupToggle} text="S'identifier" />
                        <button className={NavbarStyle.iconAccount} onClick={handlePopupToggle}><LuUser /></button>
                    </div>
                    )}
                    <NavLink className={NavbarStyle.navbarMenuBasket} onClick={scrollToTop} refresh="true" to={"/profil"}><AiOutlineShopping /></NavLink>
                </div>
            </nav>
            {isPopupOpen && <PopupConnexion onClose={handlePopupClose} />}
        </header>
    );
}


export default Navbar;
