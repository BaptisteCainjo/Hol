import React from 'react';
import PageBasFooterStyle from '../scss/pages/PageBasFooterStyle.module.scss';
import { NavLink } from 'react-router-dom';

const LegalMention = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={PageBasFooterStyle.PageBasFooterContainer}>
            <h1 className={PageBasFooterStyle.PageBasFooterTitle}>Mentions Légales</h1>
            <section>
                <h2>1. Informations Éditoriales</h2>
                <p>Holl est une plateforme de réservation et de vente en ligne indépendante, un projet universitaire de Laval. Le siège social est situé à l'IUT de Laval à 52 Rue des Docteurs Calmette et Guérin, 53000 Laval.</p>
            </section>

            <section>
                <h2>2. Contact</h2>
                <p>Pour toute question ou demande d'information, vous pouvez nous contacter avec cet e-mail : </p>
                <a href="mailto:contact.hollcompany@gmail.com" >contact.hollcompany@gmail.com</a>
            </section>

            <section>
                <h2>3. Directeur de la Publication</h2>
                <p>Le directeur de la publication du site Holl est Owen BELAUD, en qualité de Chef de projet.</p>
            </section>

            <section>
                <h2>4. Hébergeur</h2>
                <p>Le site Holl est hébergé par l'IUT de Laval, dont le siège social est situé à 52 Rue des Docteurs Calmette et Guérin, 53000 Laval.</p>
            </section>

            <section>
                <h2>5. Propriété Intellectuelle</h2>
                <h3>5.1. Droits d'Auteur</h3>
                <p>L'ensemble du contenu présent sur Holl, y compris les textes, les images, les vidéos, et les logos, est protégé par les lois sur le droit d'auteur. Toute reproduction ou utilisation non autorisée est strictement interdite.</p>

                <h3>5.2. Marques de Commerce</h3>
                <p>Les marques et logos utilisés sur Holl sont la propriété de Holl ou de tiers partenaires. Toute utilisation non autorisée est interdite.</p>
            </section>

            <section>
                <h2>6. Protection des Données Personnelles</h2>
                <p>Holl s'engage à respecter la vie privée de ses utilisateurs. Pour plus d'informations sur la collecte et le traitement des données personnelles, veuillez consulter notre <NavLink className={PageBasFooterStyle.PageBasFooterLien} to={"/private"} refresh="true" onClick={scrollToTop}>Politique de Confidentialité</NavLink>.</p>
            </section>

            <section>
                <h2>7. Cookies</h2>
                <p>Holl utilise des cookies pour améliorer l'expérience de navigation des utilisateurs. Pour plus d'informations sur l'utilisation des cookies, veuillez consulter notre Politique de Cookies.</p>
            </section>

            <section>
                <h2>8. Responsabilité</h2>
                <h3>8.1. Contenu du Site</h3>
                <p>Holl s'efforce de fournir des informations précises et à jour. Cependant, nous ne pouvons garantir l'exactitude et l'exhaustivité du contenu.</p>

                <h3>8.2. Liens Externes</h3>
                <p>Holl peut contenir des liens vers des sites externes. Nous ne sommes pas responsables du contenu ou de la politique de confidentialité de ces sites.</p>
            </section>

            <section>
                <h2>9. Modifications des Mentions Légales</h2>
                <p>Holl se réserve le droit de modifier les mentions légales. Les utilisateurs seront informés de toute modification via notre plateforme.</p>
                <p>En accédant à Holl, vous acceptez les présentes mentions légales. Pour toute question ou clarification, veuillez nous contacter via notre service client.</p>
            </section>

            <p>Merci de faire partie de la communauté Holl et de soutenir les artisans locaux.</p>
        </div>
    );
};

export default LegalMention;
