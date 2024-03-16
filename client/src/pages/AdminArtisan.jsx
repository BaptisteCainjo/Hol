import { useState } from "react";
import { startWatch } from "../features/shop/shopSlice.js";
import AdminArtisanStyle from "../scss/pages/AdminArtisan.module.scss";
import DisplayAdminArtisan from "../components/DisplayAdminArtisan/DisplayAdminArtisan.jsx";
import MenuAdminArtisan from "../components/MenuAdminArtisan/MenuAdminArtisan.jsx";
import useSession from "../utils/hooks/useSession.js";

const AdminArtisan = () => {
    const { user } = useSession();

    const [currentPage, setCurrentPage] = useState("produits"); // Par défaut, affiche la page Shop

  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };

    return user ? user.role === "artisan" ? (
        <div className={AdminArtisanStyle.InterfaceAdminArtisan}>
            <DisplayAdminArtisan currentPage={currentPage} user={user} />
            <MenuAdminArtisan user={user} onLinkClick={handleLinkClick} />
        </div>
    ) : (
        <div className={AdminArtisanStyle.InterfaceAdminArtisan}>
            <p>Vous n'avez pas l'autorisation d'accéder à cete page !</p>
        </div>
    ) : (
        <div className={AdminArtisanStyle.InterfaceAdminArtisan}>
            <p>Vous n'êtes pas connecté !</p>
        </div>
    );
};

export default AdminArtisan;
