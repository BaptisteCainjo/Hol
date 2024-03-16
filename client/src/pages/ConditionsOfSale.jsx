import React from 'react';
import PageBasFooterStyle from '../scss/pages/PageBasFooterStyle.module.scss';

const ConditionsOfSale = () => {
    return (
        <div className={PageBasFooterStyle.PageBasFooterContainer}>
            <h1 className={PageBasFooterStyle.PageBasFooterTitle}>Conditions de Vente</h1>
            <section>
                <h2>Réservations et Achats</h2>
                <h3>1. Réservations</h3>
                <p>Holl fonctionne sur le principe de la réservation anticipée. Les utilisateurs peuvent réserver les produits des artisans locaux via notre plateforme.</p>

                <h3>2. Disponibilité des Produits</h3>
                <p>La disponibilité des produits est sujette à la disponibilité des artisans locaux. Holl ne garantit pas la disponibilité constante de tous les articles.</p>

                <h3>3. Confirmation de Réservation</h3>
                <p>Une fois la réservation effectuée, l'utilisateur recevra une confirmation détaillée de sa réservation, y compris les informations sur le produit, le prix et les détails de la collecte.</p>
            </section>

            <section>
                <h2>Responsabilités des Utilisateurs</h2>
                <h3>1. Exactitude des Informations</h3>
                <p>Les utilisateurs sont responsables de fournir des informations exactes lors de la réservation. Holl ne peut être tenu responsable des erreurs de réservation causées par des informations incorrectes.</p>

                <h3>2. Utilisation Appropriée</h3>
                <p>Les utilisateurs s'engagent à utiliser Holl de manière appropriée et conforme aux lois locales.</p>
            </section>

            <section>
                <h2>Modifications des Conditions de Vente</h2>
                <p>
                    Holl se réserve le droit de modifier les conditions de vente. Les utilisateurs seront informés de toute modification via notre plateforme.
                </p>
            </section>

            <p>
                En utilisant Holl, vous acceptez les présentes conditions de vente. Pour toute question ou clarification, veuillez nous contacter via notre service client.
            </p>

            <p>
                Merci de choisir Holl pour soutenir les artisans locaux et encourager la création manuelle. Happy shopping!
            </p>
        </div>
    );
};

export default ConditionsOfSale;
