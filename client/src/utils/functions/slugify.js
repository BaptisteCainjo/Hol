export default function slugify(str) {
    return str
        .toLowerCase() // Convertir la chaîne en minuscules
        .replace(/[^\w\s-]/g, "") // Retirer les caractères non-alphanumériques, sauf les espaces et les tirets
        .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
        .replace(/--+/g, "-") // Remplacer les doubles tirets par un seul tiret
        .trim(); // Retirer les espaces en début et fin de chaîne
}