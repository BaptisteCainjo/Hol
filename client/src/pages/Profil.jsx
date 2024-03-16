import { useState } from "react";
import ProfilStyle from '../scss/pages/Profil.module.scss';
import DisplayProfil from "../components/Profil/DisplayProfil/DisplayProfil";
import MenuProfil from "../components/Profil/MenuProfil/MenuProfil";

import useSession from "../utils/hooks/useSession.js";

const Profil = () => {
    const { user } = useSession();
    const [currentPage, setCurrentPage] = useState(); // Par défaut, affiche la page Shop

    const handleLinkClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={ProfilStyle.InterfaceProfil}>
            {user ? (
                <>
                    <MenuProfil onLinkClick={handleLinkClick} user={user} />
                    <DisplayProfil currentPage={currentPage} user={user} />
                </>
            ) : (
                <div className={ProfilStyle.InterfaceProfilNotConnected}>
                    <h2>Vous n'êtes pas connecté ! Pour accéder à cette page, il faut vous connecter.</h2>
                </div>
            )}
        </div>
    );
};

export default Profil;
