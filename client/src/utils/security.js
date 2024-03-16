export const String_Error = "Le champ {#label}";
export const String_ErrorBase = `${String_Error} doit être un type "texte"`;
export const String_ErrorEmpty = `${String_Error} ne peut pas être vide`;
export const String_ErrorRequired = `${String_Error} est obligatoire`;
export const String_ErrorMin = `${String_Error} doit avoir une longueur minimale de {#limit}`;
export const String_ErrorMax = `${String_Error} doit avoir une longueur maximale de {#limit}`;
export const String_ErrorRegexLastFirstName = `${String_Error} doit être une chaîne de caractères valide`;
export const String_ErrorEmail = `${String_Error} doit contenir une adresse email et un domaine valide (yyy@zzz.fr). `;
export const String_ErrorPassword = `${String_Error} doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (@, $, !, %, *, ?, &)`;
export const String_ErrorConfirmPassword = `Les mots de passe ne correspondent pas`;

export const commonMessages = (label) => ({
  "string.base": String_ErrorBase.replace("{#label}", label),
  "string.empty": String_ErrorEmpty.replace("{#label}", label),
  "any.required": String_ErrorRequired.replace("{#label}", label),
  "string.min": String_ErrorMin.replace("{#label}", label),
});