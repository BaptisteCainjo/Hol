import React from 'react';
import PageBasFooterStyle from '../scss/pages/PageBasFooterStyle.module.scss';

const Private = () => {
    return (
        <div className={PageBasFooterStyle.PageBasFooterContainer}>
            <h1 className={PageBasFooterStyle.PageBasFooterTitle}>Politique de Confidentialité</h1>
            <section>
                <h2>1. Collecte des Informations Personnelles</h2>
                <h3>1.1. Informations Fournies par l'Utilisateur</h3>
                <p>Lors de l'utilisation de Holl, nous pouvons collecter des informations personnelles telles que votre nom, adresse e-mail, numéro de téléphone, et autres informations nécessaires à la réservation.</p>

                <h3>1.2. Informations Collectées Automatiquement</h3>
                <p>Holl peut automatiquement collecter des informations sur votre utilisation de la plateforme, y compris votre adresse IP, le type de navigateur, les pages visitées, et d'autres données similaires.</p>
            </section>

            <section>
                <h2>2. Utilisation des Informations</h2>
                <h3>2.1. Traitement des Réservations</h3>
                <p>Les informations collectées sont utilisées pour faciliter le processus de réservation, y compris la confirmation, la communication avec l'utilisateur, et la gestion des transactions.</p>

                <h3>2.2. Personnalisation de l'Expérience</h3>
                <p>Les utilisateurs s'engagent à utiliser Holl de manière appropriée et conforme aux lois locales.</p>

                <h3>2.3. Communication Marketing</h3>
                <p>Avec votre consentement, nous pouvons vous envoyer des communications marketing pour vous informer sur les promotions, les nouveautés et les événements spéciaux.</p>
            </section>

            <section>
                <h2>3. Partage d'Informations</h2>
                <h3>3.1. Avec les Artisans Locaux</h3>
                <p>Vos informations peuvent être partagées avec les artisans locaux pour faciliter la réservation et la collecte de produits.</p>

                <h3>3.2. Avec les Tiers Partenaires</h3>
                <p>Nous pouvons partager des informations avec des partenaires tiers pour améliorer nos services, tels que des prestataires de services de paiement et des partenaires marketing.</p>
            </section>

            <section>
                <h2>4. Sécurité des Données</h2>
                <p>Holl prend des mesures de sécurité appropriées pour protéger vos informations contre tout accès non autorisé, modification, divulgation ou destruction.</p>
            </section>

            <section>
                <h2>5. Cookies</h2>
                <p>Holl utilise des cookies pour améliorer l'expérience de navigation. Consultez notre Politique de Cookies pour plus d'informations sur l'utilisation des cookies.</p>
            </section>

            <section>
                <h2>6. Droits des Utilisateurs</h2>
                <p>Vous avez le droit d'accéder, de rectifier, de supprimer ou de limiter l'utilisation de vos données personnelles. Contactez-nous pour exercer ces droits.</p>
            </section>

            <section>
                <h2>7. Modifications de la Politique de Confidentialité</h2>
                <p>Holl se réserve le droit de modifier sa politique de confidentialité. Les utilisateurs seront informés de toute modification via notre plateforme.</p>
            </section>

            <p>En utilisant Holl, vous consentez à notre politique de confidentialité. Pour toute question ou demande d'information, veuillez nous contacter via notre service client.</p>

            <p>Merci de faire confiance à Holl pour vos réservations et de soutenir les artisans locaux.</p>
        </div>
    );
};

export default Private;
