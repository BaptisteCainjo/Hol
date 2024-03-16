import { SECOND_CRYPTED_IN_MINUTES } from "./config.js";

export const titleSend = `🌟 HOLL - {{firstName}} {{lastName}}, bienvenue sur la plateforme !`;
export const titleSendToArtisan = `🌟 HOLL - Félicitations, {{firstName}} {{lastName}} ! Votre boutique "{{shopName}}" vient d'être crée !`;
export const titleReSend = "🆕 HOLL - Nouveau code de validation";
export const titleSendToCompany =
  "⚠️ {{firstName}} {{lastName}} vient de s'inscrire !";
export const titleSendToCompanyArtisan =
`👨‍🎨 La boutique "{{shopName}}" de {{firstName}} {{lastName}} vient d'être crée !`;

export const mainSend = `
<h1>Bienvenue sur Holl, {{firstName}} {{lastName}} !</h1>
<p>Votre compte a bien été créé !</p>
<p>Voici votre code pour valider votre compte :</p>
<h1>{{secretKey}}</h1>
<p>Sa durée de validité est de ${SECOND_CRYPTED_IN_MINUTES} minutes !</p>
<p>A bientôt sur Holl !</p>
`;

export const mainSendToArtisan = `
  <h1>Félicitations, {{firstName}} {{lastName}} !</h1>
  <p>Votre talent artisanal a trouvé sa place sur Holl. Votre boutique "{{shopName}}" est désormais crée, manque plus qu'a la valider !</p>
  <p>Voici votre code pour valider votre compte :</p>
  <h1>{{secretKey}}</h1>
  <p>Nous sommes ravis de vous accompagner dans cette aventure artistique. Commencez dès maintenant à partager votre passion et à inspirer les autres !</p>
  <p>Sa durée de validité est de ${SECOND_CRYPTED_IN_MINUTES} minutes !</p>
  <p>A bientôt sur Holl !</p>
`;

export const mainReSend = `
  <p>Bonjour {{firstName}} {{lastName}},</p>
  <p>Voici votre nouveau code secret pour valider votre compte :</p>
  <h1>{{secretKey}}</h1>
  <p>Sa durée de validité est de ${SECOND_CRYPTED_IN_MINUTES} minutes !</p>
  <p>A bientôt sur Holl !</p>
`;

export const mainSendToCompany = `
  <h1>Nouvel utilisateur inscrit !</h1>
  <p>Un nouvel utilisateur vient de s'inscrire sur la plateforme HOLL :</p>
  <ul>
    <li><strong>Nom :</strong> {{lastName}}</li>
    <li><strong>Prénom :</strong> {{firstName}}</li>
    <li><strong>Email :</strong> {{email}}</li>
    <li><strong>Date et heure d'inscription :</strong> {{createdAt}}</li>
  </ul>
  <p>Connectez-vous à la plateforme pour accéder aux détails et prendre les mesures nécessaires.</p>
`;

export const mainSendToCompanyArtisan = `
  <h1>Nouvel artisan inscrit !</h1>
  <p>Un nouvel artisan vient de s'inscrire sur la plateforme HOLL :</p>
  <ul>
    <li><strong>Nom :</strong> {{lastName}}</li>
    <li><strong>Prénom :</strong> {{firstName}}</li>
    <li><strong>Email :</strong> {{email}}</li>
    <li><strong>Date et heure d'inscription :</strong> {{createdAt}}</li>
    <li><strong>Adresse de la boutique :</strong> {{shopAddress}}</li>
    <li><strong>IBAN :</strong> {{shopIban}}</li>
    <li><strong>Nom de la boutique :</strong> {{shopName}}</li>
    <li><strong>Numéro de Siret :</strong> {{shopSiret}}</li>
    <li><strong>Numéro de téléphone :</strong> {{shopTel}}</li>
  </ul>
  <p>Pour valider son compte, cliquez sur le lien suivant : {{VERIF_USERS}}?email={{email}}</p>
`;

const EMAIL_STYLE = `<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  background-color: #EE6603;
  color: #ffffff;
  padding: 20px;
  text-align: center;
}

main {
  padding: 20px;
}

footer {
  background-color: #f4f4f4;
  padding: 10px;
  text-align: center;
}
</style>`;

function getEmailTemplate(title, mainContent) {
  return `<!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titleSend}</title>
      ${EMAIL_STYLE}
  </head>
  <body>
    <div class="container">
      <header>
        <h1>${title}</h1>
      </header>
      <main>
        ${mainContent}
      </main>
      <footer>
        <p>L'équipe Holl</p>
      </footer>
    </div>
  </body>
  </html>`;
}

export function sendWelcomeEmail(firstName, lastName, secretKey) {
  const title = titleSend
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName);
  const mainContent = mainSend
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName)
    .replace("{{secretKey}}", secretKey);
  return getEmailTemplate(title, mainContent);
}

export function sendWelcomeEmailToArtisan(
  firstName,
  lastName,
  shopName,
  secretKey
) {
  const title = titleSendToArtisan
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName)
    .replace("{{shopName}}", shopName);
  const mainContent = mainSendToArtisan
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName)
    .replace("{{shopName}}", shopName)
    .replace("{{secretKey}}", secretKey);
  return getEmailTemplate(title, mainContent);
}

export function resendCodeEmail(firstName, lastName, secretKey) {
  const mainContent = mainReSend
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName)
    .replace("{{secretKey}}", secretKey);
  return getEmailTemplate(titleReSend, mainContent);
}

export function sendEmailToCompany(firstName, lastName, email, createdAt) {
  const title = titleSendToCompany
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName);
  const mainContent = mainSendToCompany
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName)
    .replace("{{email}}", email)
    .replace("{{createdAt}}", createdAt);
  return getEmailTemplate(title, mainContent);
}

export function sendEmailToCompanyArtisan(
  firstName,
  lastName,
  email,
  createdAt,
  shopAddress,
  shopIban,
  shopName,
  shopSiret,
  shopTel,
  VERIF_USERS
) {
  const title = titleSendToCompanyArtisan
    .replace("{{shopName}}", shopName)
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName);
  const mainContent = mainSendToCompanyArtisan
    .replace("{{firstName}}", firstName)
    .replace("{{lastName}}", lastName)
    .replaceAll("{{email}}", email)
    .replace("{{createdAt}}", createdAt)
    .replace("{{shopAddress}}", shopAddress)
    .replace("{{shopIban}}", shopIban)
    .replace("{{shopName}}", shopName)
    .replace("{{shopSiret}}", shopSiret)
    .replace("{{shopTel}}", shopTel)
    .replace("{{VERIF_USERS}}", VERIF_USERS);
  return getEmailTemplate(title, mainContent);
}
