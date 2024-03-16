import { Link } from 'react-router-dom';
import FooterStyle from "./Footer.module.scss"
import logo from "../../assets/svg/logos/logo_noir.svg";

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    return (
        <footer className={FooterStyle.footer} data-scroll-section>
            <div className={FooterStyle.containerInfos}>
                <div className={FooterStyle.logoContainer}>
                    <img src={logo} className={FooterStyle.logo}></img>
                </div>
                <div className={FooterStyle.content}>
                    <div className={FooterStyle.colonne}>
                        <p>Nous retrouver facilement</p>
                        <div className={FooterStyle.infos}>
                            <span>Institut Universitaire de <br/> Technologie de Laval</span>
                            <span>52 Rue des Docteurs Calmette <br/> et GuérinBP 2045</span>
                            <span>53020 Laval Cedex 09 France</span>
                        </div>
                    </div>
                    <div className={FooterStyle.colonne}>
                        <span>La marketplace spécialement <br/> dédiée à l&apos;artisanat</span>
                        <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/">Qui sommes-nous ?</Link></span>
                        <span className={FooterStyle.spanHovered} ><Link onClick={scrollToTop} sto="/">Notre démarche</Link></span>
                        {/* <span className={FooterStyle.spanHovered}><Link to="#">FAQ</Link></span> */}
                        {/* <span className={FooterStyle.spanHovered}><Link to="#">Contact</Link></span> */}
                        {/* <span className={FooterStyle.spanHovered}><Link to="#">Nos partenaires</Link></span> */}
                    </div>
                    {/* <div className={FooterStyle.colonne}>
                        <span>Catégories marketplace</span>
                        <span className={FooterStyle.spanHovered}><Link to="#">Alimentaire</Link></span>
                        <span className={FooterStyle.spanHovered}><Link to="#">Fabrication</Link></span>
                    </div> */}
                    <div className={FooterStyle.colonne}>
                        <span>Espace Client / Artisans</span>
                        <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/profil">Accéder à votre espace client/artisan</Link></span>
                        {/* <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/profil">Devenir artisans</Link></span> */}
                        {/* <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/profil">Accéder à votre espace artisan</Link></span> */}
                        {/* <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="#">FAQ</Link></span> */}
                    </div>
                </div>
            </div>
            <div className={FooterStyle.others} data-scroll>
                <span>&copy; Holl - Tous droits réservés</span>
                <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/confidentialite-de-vente">Condition générales de vente</Link></span>
                <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/legal-mention">Mentions légales</Link></span>
                <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/private">Vie privée</Link></span>
                <span className={FooterStyle.spanHovered}><Link onClick={scrollToTop} to="/cookies">Politique de Cookies</Link></span>
            </div>
        </footer>
    );
}

export default Footer;