import MenuProfilStyle from "./MenuProfil.module.scss";
import { useState, useEffect, useRef } from "react";

import { LuLogOut } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { LuPackage } from "react-icons/lu";
import { LuUserCircle } from "react-icons/lu";
import ShopPicto from "../../../assets/svg/icons/shop.svg";
import ReservationClient from "../../../assets/svg/icons/reservations.svg";
// import Panier from "../../../assets/svg/icons/basket.svg";
import axios from "../../../utils/net";
import { API_USERS } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import { LuChevronLeft } from "react-icons/lu";
import Wheel from "../../../assets/svg/icons/wheel.svg";

const MenuProfil = ({ onLinkClick, user }) => {
  const [activeButton, setActiveButton] = useState("infos");
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);

  const handleButtonClick = () => {
    navigate("/admin");
  };

  const handleDisplayProfil = (page) => {
    setActiveButton(page);
    onLinkClick(page);
    setMenuVisible(false);
  };

  const handleClickDeconnexion = async () => {
    try {
      await axios.post(`${API_USERS}/logout`);
      navigate("/marketplace");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div
      ref={menuRef}
      className={`${MenuProfilStyle.MenuProfil} ${
        menuVisible ? MenuProfilStyle.PanelOpen : MenuProfilStyle.PanelClosed
      }`}
    >
      <button
        className={`${MenuProfilStyle.toggleButtonMenu} ${
          menuVisible ? MenuProfilStyle.PanelOpen : MenuProfilStyle.PanelClosed
        }`}
        onClick={toggleMenu}
      >
        <LuChevronLeft />
      </button>
      <div className={MenuProfilStyle.MenuProfilContenu}>
        <h1 className={MenuProfilStyle.MenuProfilTitle}>Page Profil</h1>
        <div className={MenuProfilStyle.MenuProfilClient}>
          <ul className={MenuProfilStyle.MenuProfilChoice}>
            <li
              onClick={() => handleDisplayProfil("infos")}
              className={activeButton === "infos" ? MenuProfilStyle.active : ""}
            >
              <div className={MenuProfilStyle.MenuProfilLiActive}></div>
              <LuUserCircle />
              <button>Informations personnelles</button>
            </li>
            <li
              onClick={() => handleDisplayProfil("reservations")}
              className={
                activeButton === "reservations" ? MenuProfilStyle.active : ""
              }
            >
              <div className={MenuProfilStyle.MenuProfilLiActive}></div>
              <img src={ReservationClient} alt="" />
              <button>Mes réservations</button>
            </li>
          </ul>
        </div>

        <div className={MenuProfilStyle.MenuProfilArtisans}>
          {user.role === "artisan" && (
            <>
              <hr className={MenuProfilStyle.MenuProfilArtisansSeparator}></hr>
              <ul className={MenuProfilStyle.MenuProfilChoice}>
                <li>
                  <div className={MenuProfilStyle.MenuProfilLiActive}></div>
                  <img src={ShopPicto} alt="Ma boutique" />
                  <button
                    className={
                      activeButton === "boutique" ? MenuProfilStyle.active : ""
                    }
                    onClick={() => handleButtonClick("boutique")}
                  >
                    Ma boutique
                  </button>
                </li>
                <li onClick={() => handleButtonClick("produits")}>
                  <div className={MenuProfilStyle.MenuProfilLiActive}></div>
                  <LuPackage />
                  <button>Mes produits</button>
                </li>
                <li onClick={() => handleButtonClick("reservations")}>
                  <div className={MenuProfilStyle.MenuProfilLiActive}></div>
                  <LuCalendarDays />
                  <button
                    className={
                      activeButton === "reservations"
                        ? MenuProfilStyle.active
                        : ""
                    }
                    onClick={() => handleButtonClick("reservations")}
                  >
                    Les réservations
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>

        <button
          className={MenuProfilStyle.MenuProfilDeconnexion}
          onClick={handleClickDeconnexion}
        >
          Se déconnecter
          <LuLogOut />
        </button>
      </div>
      <img
        className={MenuProfilStyle.MenuProfilPictoWheel}
        src={Wheel}
        alt=""
      />
    </div>
  );
};

export default MenuProfil;
