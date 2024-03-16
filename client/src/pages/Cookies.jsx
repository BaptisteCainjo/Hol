import React from 'react';
import PageBasFooterStyle from '../scss/pages/PageBasFooterStyle.module.scss';

const Cookies = () => {
    return (
        <div className={PageBasFooterStyle.PageBasFooterContainer}>
            <h1 className={PageBasFooterStyle.PageBasFooterTitle}>Politique de Cookies</h1>
            <section>
                <h2>1. Introduction</h2>
                <p>Holl utilise des cookies pour faciliter votre expérience de connexion sur notre plateforme. Les cookies sont de petits fichiers texte qui sont stockés sur votre appareil lorsque vous visitez notre site. Cette politique de cookies explique comment nous utilisons ces cookies dans le contexte spécifique de la connexion à notre site.</p>
            </section>

            <section>
                <h2>2. Types de Cookies utilisés</h2>
                <h3>2.1. Cookies Essentiels</h3>
                <p>Holl utilise des cookies de session pour faciliter la connexion des utilisateurs. Ces cookies sont temporaires et sont supprimés lorsque vous fermez votre navigateur.</p>
            </section>

            <section>
                <h2>3. Contrôle des Cookies</h2>
                <h3>3.1. Acceptation des Cookies</h3>
                <p>En continuant à utiliser Holl, vous consentez à l'utilisation des cookies nécessaires à la connexion.</p>

                <h3>3.2. Paramètres du Navigateur</h3>
                <p>Vous pouvez configurer les paramètres de votre navigateur pour bloquer ou vous avertir de l'utilisation de cookies. Cependant, veuillez noter que bloquer les cookies peut affecter votre capacité à accéder à certaines parties de Holl.</p>
            </section>

            <section>
                <h2>4. Consentement</h2>
                <p>En utilisant Holl et en acceptant les cookies nécessaires à la connexion, vous consentez à cette utilisation conformément à cette politique.</p>
            </section>

            <section>
                <h2>5. Modifications de la Politique de Cookies</h2>
                <p>Holl se réserve le droit de modifier sa politique de cookies. Les utilisateurs seront informés de toute modification via notre plateforme.</p>
            </section>

            <p>Pour toute question concernant notre politique de cookies, veuillez nous contacter via notre service client.</p>

            <p>Merci de faire confiance à Holl pour vos réservations et de soutenir les artisans locaux.</p>
        </div>
    );
};

export default Cookies;
