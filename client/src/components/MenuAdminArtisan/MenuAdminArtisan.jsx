import { useState } from "react";
import MenuAdminArtisanStyle from "./MenuAdminArtisan.module.scss";
import EditProductAdmin from "../EditElementAdmin/EditElementAdmin";
import { LuBoxSelect, LuChevronLeft } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { stopEdit } from "../../features/shop/shopSlice";


const MenuAdminArtisan = ({ onLinkClick, user }) => {
    const [activeButton, setActiveButton] = useState("produits");
    const [isPanelVisible, setIsPanelVisible] = useState(true); // État pour suivre si le panneau est visible

    const dispatch = useDispatch();
    const editingProduct = useSelector((state) => state.shop.editingProduct);

    const handleButtonClick = (page) => {
        setActiveButton(page);
        onLinkClick(page);
        dispatch(stopEdit(null));
    };

    const togglePanelVisibility = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    return (
        <div className={`${MenuAdminArtisanStyle.MenuAdminArtisan} ${isPanelVisible ? MenuAdminArtisanStyle.PanelOpen : MenuAdminArtisanStyle.PanelClosed}`}>
            <button className={`${MenuAdminArtisanStyle.MenuAdminArtisanTogglePanelButton} ${isPanelVisible ? MenuAdminArtisanStyle.PanelOpen : MenuAdminArtisanStyle.PanelClosed}`} onClick={togglePanelVisibility}><LuChevronLeft /></button>

            {isPanelVisible && (
                <div id={MenuAdminArtisanStyle.MenuAdminArtisanPanel}>
                    <ul className={MenuAdminArtisanStyle.MenuAdminArtisanChoice}>
                        <li>
                            <button
                                className={activeButton === "boutique" ? MenuAdminArtisanStyle.active : ""}
                                onClick={() => handleButtonClick("boutique")}
                            >
                                Ma boutique
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeButton === "produits" ? MenuAdminArtisanStyle.active : ""}
                                onClick={() => handleButtonClick("produits")}
                            >
                                Mes produits
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeButton === "reservations" ? MenuAdminArtisanStyle.active : ""}
                                onClick={() => handleButtonClick("reservations")}
                            >
                                Mes réservations
                            </button>
                        </li>
                    </ul>

                    {/* affiche composant modifier ou ajouter ou supprimer */}
                    {/* si on est dans le menu products et que on a cliqué sur modifier un produit ou cliqué sur nouveau produit: */}
                    {editingProduct || activeButton === "boutique" ?
                        <EditProductAdmin user={user} page={activeButton} />
                        : 
                        <div className={MenuAdminArtisanStyle.emptyStatePanel}>
                            {activeButton === "produits" ?
                                <p>Cliquez sur ajouter l'icone d'édition <br /> d'un produit pour le modifier.</p> :
                                <p>Cliquez sur l'icone d'édition d'un produit <br /> pour modifier une réservation.</p>
                            }
                            <LuBoxSelect />
                        </div>
                    }
                </div>
            )}
        </div>
    );
}

export default MenuAdminArtisan;