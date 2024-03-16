import mongoose from "mongoose";
import Shop from "../../models/shop.js";
import Product from "../../models/product.js";
import User from "../../models/user.js";

mongoose.connect('mongodb://localhost:27018/mongodb');

const shopsData = [
    {
        name: "Artisanat Élégant",
        slug: "artisanat-elegant",
        images: {
            thumbnail: "http://localhost:5000/uploads/mock_9b2a9905-5c39-4533-9967-f5336ec6e20d.webp"
        },
        description: "Une boutique artisanale offrant des créations élégantes pour la maison.",
        tags: ["artisanat", "décoration", "maison"],
        address: {
            street: "52 Rue des Docteurs Calmette et Guérin",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@artisanat-elegant.com",
        phoneNumber: "+33 6 12 34 56 78",
        openingHours: [
            {
                day: "lundi",
                periods: []
            },
            {
                day: "mardi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "mercredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "jeudi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "vendredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "samedi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "dimanche",
                periods: []
            },
        ],
        note: 4.2
    },
    {
        name: "Créations Artisanales Uniques",
        slug: "creations-artisanales-uniques",
        images: {
            thumbnail: "http://localhost:5000/uploads/mock_1155c04f-058a-452f-b6fd-24f5c70218fa.webp"
        },
        description: "Découvrez des pièces uniques conçues par des artisans talentueux.",
        tags: ["artisanat", "décoration", "maison"],
        address: {
            street: "Pl. du 11 Novembre",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "info@creations-uniques.fr",
        phoneNumber: "+33 7 23 45 67 89",
        openingHours: [
            {
                day: "lundi",
                periods: []
            },
            {
                day: "mardi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "mercredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "jeudi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "vendredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "samedi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "dimanche",
                periods: []
            },
        ],
        note: 4.5
    },
    {
        name: "Artisanat Vintage",
        slug: "artisanat-vintage",
        images: {
            thumbnail: "http://localhost:5000/uploads/mock_7a3aa83b-46ab-4e0b-b46c-8b6c916397e4.webp"
        },
        description: "Une collection vintage de pièces artisanales réimaginées.",
        tags: ["artisanat", "décoration", "maison", "vintage"],
        address: {
            street: "Pl. de la Tremoille",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "boutique-vintage@gmail.com",
        phoneNumber: "+33 6 98 76 54 32",
        openingHours: [
            {
                day: "lundi",
                periods: []
            },
            {
                day: "mardi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "mercredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "jeudi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "vendredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "samedi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "dimanche",
                periods: []
            },
        ],
        note: 4.0
    },
    {
        name: "Créations Artistiques Modernes",
        slug: "creations-artistiques-modernes",
        images: {
            thumbnail: "http://localhost:5000/uploads/mock_14caac7d-7813-4a3f-8a4d-8b037a1fec37.webp"
        },
        description: "Explorez des œuvres modernes conçues par des artisans contemporains.",
        tags: ["artisanat", "décoration", "maison", "moderne"],
        address: {
            street: "33 Rue du Haut Rocher",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "modern-artists@creations.fr",
        phoneNumber: "+33 7 87 65 43 21",
        openingHours: [
            {
                day: "lundi",
                periods: []
            },
            {
                day: "mardi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "mercredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "jeudi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "vendredi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "samedi",
                periods: [
                    { start: "8:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "dimanche",
                periods: []
            },
        ],
        note: 4.8
    },
    // ici changer
    {
        name: "Atelier Artisanal Le Petit Chêne",
        slug: "atelier-artisanal-le-petit-chene",
        images: {
            thumbnail: "http://localhost:5000/uploads/atelier-artisanal-le-petit-chene.webp"
        },
        description: "Un atelier artisanal spécialisé dans la fabrication de meubles en bois de chêne.",
        tags: ["artisanat", "décoration", "maison", "bois"],
        address: {
            street: "7 Rue des Artisans",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@lepetitchene-artisanal.com",
        phoneNumber: "+33 6 45 67 89 01",
        openingHours: [
            {
                day: "Lundi à samedi",
                periods: [
                    { start: "10:00", end: "18:00" }
                ]
            },
        ],
        note: 4.1
    },
    {
        name: "Bijoux Artisanaux La Rose Éternelle",
        slug: "bijoux-artisanaux-la-rose-eternelles",
        images: {
            thumbnail: "http://localhost:5000/uploads/bijoux-artisanaux-la-rose-eternelles.webp"
        },
        description: "Une boutique d'artisanat proposant des bijoux artisanaux uniques et faits à la main.",
        tags: ["artisanat", "bijoux", "unique"],
        address: {
            street: "25 Rue de la Rose",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@laroseeternelle-bijoux.com",
        phoneNumber: "+33 6 23 45 67 89",
        openingHours: [
            {
                day: "Mardi à vendredi",
                periods: [
                    { start: "10:00", end: "13:00" },
                    { start: "14:00", end: "19:00" }
                ]
            },
            {
                day: "Samedi",
                periods: [
                    { start: "10:00", end: "13:00" }
                ]
            },
        ],
        note: 4.8
    },
    {
        name: "Atelier Terre Créative",
        slug: "atelier-terre-creative",
        images: {
            thumbnail: "http://localhost:5000/uploads/atelier-terre-creative.webp"
        },
        description: "Un atelier artisanal dédié à la création de poteries uniques et authentiques.",
        tags: ["artisanat", "décoration", "poterie", "création"],
        address: {
            street: "10 Rue de la Poterie",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "boutique-vintage@gmail.com",
        phoneNumber: "+33 6 78 90 12 34",
        openingHours: [
            {
                day: "Lundi à vendredi",
                periods: [
                    { start: "9:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "Samedi",
                periods: [
                    { start: "9:00", end: "12:00" },
                ]
            },
        ],
        note: 4.5
    },
    {
        name: "Boutique Métiers d'Art Le Joyau",
        slug: "boutique-metiers-art-joyau",
        images: {
            thumbnail: "http://localhost:5000/uploads/boutique-metiers-art-joyau.webp"
        },
        description: "Une boutique spécialisée dans les métiers d'art, offrant une sélection de pièces uniques et raffinées.",
        tags: ["artisanat", "joyau", "art", "uniques"],
        address: {
            street: "15 Rue des Métiers",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@lejoyau-metiersdart.com",
        phoneNumber: "+33 6 12 34 56 78",
        openingHours: [
            {
                day: "Lundi à vendredi",
                periods: [
                    { start: "10:00", end: "13:00" },
                    { start: "14:00", end: "20:00" }
                ]
            },
            {
                day: "Samedi",
                periods: [
                    { start: "10:00", end: "17:00" }
                ]
            },
        ],
        note: 4.8
    },
    {
        name: "Boutique Cuir et Couture",
        slug: "boutique-cuir-et-couture",
        images: {
            thumbnail: "http://localhost:5000/uploads/boutique-cuir-et-couture.webp"
        },
        description: "Une boutique artisanale spécialisée dans la maroquinerie et la couture sur mesure.",
        tags: ["artisanat", "maroquinerie", "couture"],
        address: {
            street: "8 Avenue de la Couture",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@cuiretcouture.com",
        phoneNumber: "+33 6 23 45 67 89",
        openingHours: [
            {
                day: "lundi",
                periods: []
            },
            {
                day: "Mardi à jeudi",
                periods: [
                    { start: "9:00", end: "12:00" },
                    { start: "14:00", end: "18:00" }
                ]
            },
            {
                day: "Vendredi",
                periods: [
                    { start: "9:00", end: "12:00" }
                ]
            },
            {
                day: "Samedi",
                periods: [
                    { start: "10:00", end: "16:00" }
                ]
            },
        ],
        note: 3.8
    },
    {
        name: "Boutique Métal Fusion",
        slug: "boutique-metal-fusion",
        images: {
            thumbnail: "http://localhost:5000/uploads/boutique-metal-fusion.webp"
        },
        description: "Une boutique spécialisée dans la création artistique en métal, proposant des sculptures et des objets décoratifs uniques.",
        tags: ["artisanat", "métal", "sculptures", "décoration"],
        address: {
            street: "20 Rue de la Fusion",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@metalfusion.com",
        phoneNumber: "+33 6 34 56 78 90",
        openingHours: [
            {
                day: "Mercredi à samedi",
                periods: [
                    { start: "11:00", end: "13:00" },
                    { start: "15:00", end: "19:00" }
                ]
            },
            {
                day: "Dimanche",
                periods: [
                    { start: "11:00", end: "13:00" }
                ]
            },
        ],
        note: 4.5
    },
    {
        name: "Épicerie Fine La Saveur Authentique",
        slug: "epicerie-fine-la-saveur-authentique",
        images: {
            thumbnail: "http://localhost:5000/uploads/epicerie-fine-la-saveur-authentique.webp"
        },
        description: "Une épicerie fine proposant une sélection de produits alimentaires artisanaux de qualité supérieure.",
        tags: ["artisanat", "épicerie", "alimentaire"],
        address: {
            street: "25 Rue de la Saveur",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@lasaveurauthentique.com",
        phoneNumber: "+33 6 12 34 56 78",
        openingHours: [
            {
                day: "Lundi à vendredi",
                periods: [
                    { start: "9:00", end: "19:00" },
                ]
            },
            {
                day: "Samedi",
                periods: [
                    { start: "9:00", end: "17:00" }
                ]
            },
        ],
        note: 4.0
    },
    {
        name: "Boulangerie Pâtisserie Le Pain Doré",
        slug: "boulangerie-patisserie-le-pain-dore",
        images: {
            thumbnail: "http://localhost:5000/uploads/boulangerie-patisserie-le-pain-dore.webp"
        },
        description: "Une boulangerie-pâtisserie artisanale offrant une variété de pains et de pâtisseries fraîchement préparés.",
        tags: ["artisanat", "boulangerie", "pains", "pâtisserie"],
        address: {
            street: "40 Rue du Pain",
            city: "Laval",
            postalCode: "53000",
            country: "France"
        },
        email: "contact@lepaindore.com",
        phoneNumber: "+33 6 23 45 67 89",
        openingHours: [
            {
                day: "Lundi au samedi",
                periods: [
                    { start: "7:00", end: "19:00" }
                ]
            },
            {
                day: "Dimanche",
                periods: [
                    { start: "7:00", end: "13:00" }
                ]
            },
        ],
        note: 4.8
    },
];

const productsData = [
    // Produits Boutique 1 : Artisanat Élégant
    {
        name: "Vase en Céramique",
        price: 25.99,
        details: {
            material: { label: "Matériau", value: "Céramique" },
            color: { label: "Couleur", value: "Blanc" }
        },
        stock: 5,
        description: "Le vase en céramique est une pièce décorative alliant élégance et utilité. Fabriqué avec une céramique de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de formes, couleurs et motifs, ce vase apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être utilisé comme objet décoratif ou pour afficher des fleurs fraîches, ajoutant ainsi une esthétique intemporelle à votre décoration.",
        details: {
            fabrication: { label: "Matériaux", value: "céramique, pierre, verre" },
        },
        tags: ["vase", "céramique", "décoration"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/assortiment-pots-terre-cuite_23-2148986307.jpg",
            gallery: []
        },
    },
    {
        name: "Bougie Parfumée à la Lavande",
        price: 15.50,
        details: {
            scent: { label: "Parfum", value: "Lavande" },
            burnTime: { label: "Durée de combustion", value: "20 heures" }
        },
        stock: 10,
        description: "La bougie parfumée à la lavande est fabriquée à partir de cire de soja naturelle et d'huiles essentielles de lavande. Elle offre une combustion propre et une diffusion lente du parfum apaisant de la lavande. Cette bougie est idéale pour créer une atmosphère relaxante et apaisante dans votre maison. Elle est également un excellent choix pour offrir en cadeau.",
        tags: ["bougie", "lavande", "parfum"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/nature-morte-bougie-element-tricote_169016-27015.jpg",
            gallery: []
        },
    },
    {
        name: "Coussin Brodé à la Main",
        price: 35.00,
        details: {
            fabric: { label: "Matière", value: "Lin" },
            embroidery: { label: "Broderie", value: "Motif floral" }
        },
        stock: 3,
        description: "Le coussin brodé à la main est un ajout élégant à votre canapé ou à votre lit. Fabriqué en lin de haute qualité, il est doux, confortable et durable. La broderie à la main ajoute une touche artistique et une esthétique vintage à ce coussin. Disponible dans une variété de couleurs et de motifs, il est idéal pour ajouter une touche de couleur et de texture à votre décoration intérieure.",
        tags: ["coussin", "broderie", "lin"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/oreiller-canape_74190-3917.jpg",
            gallery: []
        },
    },
   

    // Produits Boutique 2 : Créations Artisanales Uniques
    {
        name: "Collier en Perles de Verre",
        price: 30.00,
        details: {
            material: { label: "Matériau", value: "Verre" },
            length: { label: "Longueur", value: "45 cm" }
        },
        stock: 2,
        description: "Le collier en perles de verre est une pièce décorative alliant élégance et utilité. Fabriqué avec des perles de verre de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de formes, couleurs et motifs, ce collier apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["collier", "verre", "bijoux"],
        images: {
            thumbnail: "https://img.freepik.com/vecteurs-libre/perles-mardi-gras-realistes_23-2148790480.jpg",
            gallery: []
        },
    },
    {
        name: "Sculpture en Bois Flotté",
        price: 45.99,
        details: {
            woodType: { label: "Type de bois", value: "Bois flotté" },
            height: { label: "Hauteur", value: "30 cm" }
        },
        stock: 1,
        description: "La sculpture en bois flotté est une pièce décorative unique et artistique. Fabriquée à partir de bois flotté naturel, chaque sculpture est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette sculpture est idéale pour ajouter une touche artistique et une esthétique naturelle à votre décoration intérieure.",
        tags: ["sculpture", "bois", "décoration"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/vue-laterale-mains-sculpture-argile_23-2149730873.jpg",
            gallery: []
        },
    },
    {
        name: "Tasse en Céramique Peinte à la Main",
        price: 18.50,
        details: {
            color: { label: "Couleur", value: "Bleu" },
            handPainted: { label: "Peint à la main", value: true }
        },
        stock: 4,
        description: "La tasse en céramique peinte à la main est une pièce décorative alliant élégance et utilité. Fabriquée avec une céramique de haute qualité, elle offre une finition lisse et durable. Peinte à la main, chaque tasse est une pièce unique. Disponible dans une variété de couleurs et de motifs, cette tasse apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour servir des boissons chaudes ou froides, ajoutant ainsi une esthétique intemporelle à votre décoration.",
        tags: ["tasse", "céramique", "peinture"],
        images: {
            thumbnail: "https://i.etsystatic.com/7495225/r/il/fae63a/4300730887/il_570xN.4300730887_9ckm.jpg",
            gallery: []
        },
    },

    // Produits Boutique 3
    {
        name: "Montre de Poche Rétro",
        price: 55.99,
        details: {
            style: { label: "Style", value: "Rétro" },
            mechanism: { label: "Mécanisme", value: "Mécanique" }
        },
        stock: 3,
        description: "La montre de poche rétro est une pièce décorative alliant élégance et utilité. Fabriquée avec des matériaux de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de mécanismes, cette montre apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être portée pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["montre", "rétro", "mécanique"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/montre-poche-paillettes-table_23-2147992830.jpg",
            gallery: []
        },
    },
    {
        name: "Sac à Main en Cuir Véritable",
        price: 68.50,
        details: {
            leatherType: { label: "Type de cuir", value: "Cuir véritable" },
            color: { label: "Couleur", value: "Noir" }
        },
        stock: 2,
        description: "Le sac à main en cuir véritable est une pièce élégante et pratique. Fabriqué avec du cuir de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de styles et de couleurs, ce sac apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["sac", "cuir", "noir"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/sac-cuir-pour-voyager-ecouteurs_23-2149434023.jpg",
            gallery: []
        },
    },
    {
        name: "Lampe de Table Style Industriel",
        price: 42.00,
        details: {
            style: { label: "Style", value: "Industriel" },
            material: { label: "Matériau", value: "Métal" }
        },
        stock: 5,
        description: "La lampe de table style industriel est une pièce décorative alliant élégance et utilité. Fabriquée avec des matériaux de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de matériaux, cette lampe apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour éclairer une pièce ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["lampe", "industriel", "métal"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/studio-accessoires-pour-photographie_23-2148885685.jpg",
            gallery: []
        },
    },

    // Produits Boutique 4
    {
        name: "Sculpture Abstraite en Métal",
        price: 75.00,
        details: {
            material: { label: "Matériau", value: "Métal" },
            style: { label: "Style", value: "Abstrait" }
        },
        stock: 1,
        description: "La sculpture abstraite en métal est une pièce décorative unique et artistique. Fabriquée à partir de métal de haute qualité, chaque sculpture est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette sculpture est idéale pour ajouter une touche artistique et une esthétique moderne à votre décoration intérieure.",
        tags: ["sculpture", "métal", "abstrait"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/papier-peint-esthetique-dore-cone-tenant-main_23-2149872238.jpg",
            gallery: []
        },
    },
    {
        name: "Lampe LED Design Minimaliste",
        price: 48.99,
        details: {
            style: { label: "Style", value: "Minimaliste" },
            color: { label: "Couleur", value: "Blanc chaud" }
        },
        stock: 3,
        description: "La lampe LED design minimaliste est une pièce décorative alliant élégance et utilité. Fabriquée avec des matériaux de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de couleurs, cette lampe apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour éclairer une pièce ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["lampe", "led", "minimaliste"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/lampe-plafond_1203-8530.jpg",
            gallery: []
        },
    },
    {
        name: "Table Basse en Verre et Acier",
        price: 120.00,
        details: {
            material: { label: "Matériau", value: "Verre et Acier" },
            size: { label: "Taille", value: "80x60 cm" }
        },
        stock: 2,
        description: "La table basse en verre et acier est une pièce décorative alliant élégance et utilité. Fabriquée avec des matériaux de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de matériaux, cette table apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour afficher des objets décoratifs ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["table basse", "verre", "acier"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/tables-chaises-dans-restaurant_1232-3032.jpg",
            gallery: []
        },
    },

    // Produits Boutique 5
    {
        name: "Table de Salle à Manger en Chêne Massif",
        price: 99.99,
        details: {
            material: { label: "Matériau", value: "Bois de chêne" },
            style: { label: "Style", value: "Rustique" }
        },
        stock: 1,
        description: "La table de salle à manger en chêne massif est une pièce décorative alliant élégance et utilité. Fabriquée avec du bois de chêne de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de formes, cette table apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour servir des repas ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["Décoration", "Maison", "Artisanat"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/fond-table-manger-pour-appels-zoom_23-2149684456.jpg",
            gallery: [""]
        }
    },
    {
        name: "Chaise de Salle à Manger en Chêne Massif",
        price: 49.99,
        details: {
            material: { label: "Matériau", value: "Bois de chêne" },
            style: { label: "Style", value: "Rustique" }
        },
        stock: 4,
        description: "La chaise de salle à manger en chêne massif est une pièce décorative alliant élégance et utilité. Fabriquée avec du bois de chêne de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de formes, cette chaise apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour servir des repas ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["Décoration", "Maison", "Artisanat"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/plan-vertical-chaise-bois-table-dans-piece-paisible-blanche_181624-2749.jpg",
            gallery: [""]
        }
    },
    {
        name: "Banc en Chêne Massif",
        price: 69.99,
        details: {
            material: { label: "Matériau", value: "Bois de chêne" },
            style: { label: "Style", value: "Rustique" }
        },
        stock: 2,
        description: "Le banc en chêne massif est une pièce décorative alliant élégance et utilité. Fabriqué avec du bois de chêne de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de styles et de formes, ce banc apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être utilisé pour servir des repas ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["Décoration", "Maison", "Artisanat"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/banc-automne-central-park-dans-centre-manhattan-new-york-city_649448-4604.jpg",
            gallery: [""]
        }
    },

    // Produits Boutique 6
    {
        name: "Collier en Perles de Verre",
        price: 30.00,
        details: {
            material: { label: "Matériau", value: "Verre" },
            length: { label: "Longueur", value: "45 cm" }
        },
        stock: 2,
        description: "Le collier en perles de verre est une pièce décorative alliant élégance et utilité. Fabriqué avec des perles de verre de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de formes, couleurs et motifs, ce collier apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["collier", "verre", "bijoux"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/collier-tendance-perles-bleues-oranges_144627-12337.jpg",
            gallery: []
        },
    },
    {
        name: "Bracelet en Argent Sterling",
        price: 45.99,
        details: {
            material: { label: "Matériau", value: "Argent Sterling" },
            length: { label: "Longueur", value: "18 cm" }
        },
        stock: 3,
        description: "Le bracelet en argent sterling est une pièce décorative alliant élégance et utilité. Fabriqué avec de l'argent sterling de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de styles et de motifs, ce bracelet apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["bracelet", "argent", "bijoux"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/gros-plan-mains-mariee_181624-40806.jpg",
            gallery: []
        },
    },
    {
        name: "Boucles d'Oreilles en Perles de Cristal",
        price: 18.50,
        details: {
            material: { label: "Matériau", value: "Cristal" },
            color: { label: "Couleur", value: "Rouge" }
        },
        stock: 4,
        description: "Les boucles d'oreilles en perles de cristal sont une pièce décorative alliant élégance et utilité. Fabriquées avec des perles de cristal de haute qualité, elles offrent une finition lisse et durable. Disponibles dans une variété de couleurs et de motifs, ces boucles d'oreilles apportent une touche artistique à tout espace intérieur. Polyvalentes, elles peuvent être portées pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["boucles d'oreilles", "cristal", "rouge"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/nature-morte-boucles-oreilles-esthetiques_23-2149649102.jpg",
            gallery: []
        },
    },

    // Produits Boutique 7
    {
        name: "Poterie en Terre Cuite",
        price: 25.99,
        details: {
            material: { label: "Matériau", value: "Terre cuite" },
            color: { label: "Couleur", value: "Rouge" }
        },
        stock: 5,
        description: "La poterie en terre cuite est une pièce décorative alliant élégance et utilité. Fabriquée avec une terre cuite de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de formes, couleurs et motifs, cette poterie apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée comme objet décoratif ou pour afficher des fleurs fraîches, ajoutant ainsi une esthétique intemporelle à votre décoration.",
        details: {
            material: { label: "Matériaux", value: "terre cuite, pierre, verre" },
            color: { label: "Couleur", value: "Rouge" }
        },
        tags: ["poterie", "terre cuite", "rouge"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/artisan-poterie-dans-studio-creant-ceramique_23-2150164920.jpg",
            gallery: []
        },
    },
    {
        name: "Sculpture en Argile",
        price: 45.99,
        details: {
            material: { label: "Matériau", value: "Argile" },
            color: { label: "Couleur", value: "Beige" }
        },
        stock: 1,
        description: "La sculpture en argile est une pièce décorative unique et artistique. Fabriquée à partir d'argile naturelle, chaque sculpture est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette sculpture est idéale pour ajouter une touche artistique et une esthétique naturelle à votre décoration intérieure.",
        tags: ["sculpture", "argile", "beige"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/creation-processus-poterry-gros-plan_23-2148270984.jpg",
            gallery: []
        },
    },
    {
        name: "Assiette en Céramique Peinte à la Main",
        price: 18.50,
        details: {
            material: { label: "Matériau", value: "Céramique" },
            color: { label: "Couleur", value: "Bleu" }
        },
        stock: 4,
        description: "L'assiette en céramique peinte à la main est une pièce décorative alliant élégance et utilité. Fabriquée avec une céramique de haute qualité, elle offre une finition lisse et durable. Peinte à la main, chaque assiette est une pièce unique. Disponible dans une variété de couleurs et de motifs, cette assiette apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour servir des repas ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["assiette", "céramique", "peinture"],
        images: {
            thumbnail: "https://img.freepik.com/vecteurs-libre/illustration-vectorielle-plaque-vintage-remixee-partir-oeuvre-art-byron-dingman_53876-125497.jpg",
            gallery: []
        },
    },

    // Produits Boutique 8
    // Boutique Métiers d'Art Le Joyau
    {
        name: "Joyau en Argent Sterling",
        price: 55.99,
        details: {
            material: { label: "Matériau", value: "Argent Sterling" },
            style: { label: "Style", value: "Moderne" }
        },
        stock: 3,
        description: "Le joyau en argent sterling est une pièce décorative alliant élégance et utilité. Fabriqué avec de l'argent sterling de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de styles et de formes, ce joyau apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["joyau", "argent", "bijoux"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/differents-outils-orfevres-lieu-travail-bijoux-bijoutier-au-travail-dans-bijoux_155003-5036.jpg",
            gallery: []
        },
    },
    {
        name: "Lampe LED Design Minimaliste",
        price: 48.99,
        details: {
            style: { label: "Style", value: "Minimaliste" },
            color: { label: "Couleur", value: "Blanc chaud" }
        },
        stock: 3,
        description: "La lampe LED design minimaliste est une pièce décorative alliant élégance et utilité. Fabriquée avec des matériaux de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de couleurs, cette lampe apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être utilisée pour éclairer une pièce ou pour ajouter une esthétique intemporelle à votre décoration.",
        tags: ["lampe", "led", "minimaliste"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/studio-accessoires-pour-photographie_23-2148885685.jpg",
            gallery: []
        },
    },
    {
        name: "Oeuvre d'Art en Verre Soufflé",
        price: 120.00,
        details: {
            material: { label: "Matériau", value: "Verre soufflé" },
            style: { label: "Style", value: "Moderne" }
        },
        stock: 2,
        description: "L'oeuvre d'art en verre soufflé est une pièce décorative unique et artistique. Fabriquée à partir de verre soufflé de haute qualité, chaque oeuvre est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette oeuvre est idéale pour ajouter une touche artistique et une esthétique moderne à votre décoration intérieure.",
        tags: ["oeuvre d'art", "verre soufflé", "moderne"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/arrangement-vases-minimalistes-verts-angle-eleve_23-2149681099.jpg",
            gallery: []
        },
    },

    // Produits Boutique 9
    // Boutique Cuir et Couture
    {
        name: "Sac à Main en Cuir Véritable",
        price: 68.50,
        details: {
            leatherType: { label: "Type de cuir", value: "Cuir véritable" },
            color: { label: "Couleur", value: "Noir" }
        },
        stock: 2,
        description: "Le sac à main en cuir véritable est une pièce élégante et pratique. Fabriqué avec du cuir de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de styles et de couleurs, ce sac apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["sac", "cuir", "noir"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/sac-suspendu-meuble-interieur_23-2151073503.jpg",
            gallery: []
        },
    },
    {
        name: "Manchette en Cuir Tressé",
        price: 35.00,
        details: {
            leatherType: { label: "Type de cuir", value: "Cuir véritable" },
            color: { label: "Couleur", value: "Marron" }
        },
        stock: 3,
        description: "La manchette en cuir tressé est une pièce élégante et pratique. Fabriquée avec du cuir de haute qualité, elle offre une finition lisse et durable. Disponible dans une variété de styles et de couleurs, cette manchette apporte une touche artistique à tout espace intérieur. Polyvalente, elle peut être portée pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["manchette", "cuir", "marron"],
        images: {
            thumbnail: "https://img.freepik.com/free-photo/closeup-hole-silver-black-strap_1203-6424.jpg",
            gallery: []
        },
    },
    {
        name: "Portefeuille en Cuir Grainé",
        price: 18.50,
        details: {
            leatherType: { label: "Type de cuir", value: "Cuir véritable" },
            color: { label: "Couleur", value: "Noir" }
        },
        stock: 4,
        description: "Le portefeuille en cuir grainé est une pièce élégante et pratique. Fabriqué avec du cuir de haute qualité, il offre une finition lisse et durable. Disponible dans une variété de styles et de couleurs, ce portefeuille apporte une touche artistique à tout espace intérieur. Polyvalent, il peut être porté pour ajouter une esthétique intemporelle à votre tenue.",
        tags: ["portefeuille", "cuir", "noir"],
        images: {
            thumbnail: "https://img.freepik.com/free-photo/man-creates-leather-ware_1157-33999.jpg",
            gallery: []
        },
    },

    // Produits Boutique 10
    // Boutique Métal Fusion
    {
        name: "Sculpture en Métal",
        price: 75.00,
        details: {
            material: { label: "Matériau", value: "Métal" },
            style: { label: "Style", value: "Moderne" }
        },
        stock: 1,
        description: "La sculpture en métal est une pièce décorative unique et artistique. Fabriquée à partir de métal de haute qualité, chaque sculpture est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette sculpture est idéale pour ajouter une touche artistique et une esthétique moderne à votre décoration intérieure.",
        tags: ["sculpture", "métal", "moderne"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/figure-tortue-metallique-sombre_53876-95211.jpg",
            gallery: []
        },
    },
    {
        name: "Sculpture en Métal",
        price: 75.00,
        details: {
            material: { label: "Matériau", value: "Métal" },
            style: { label: "Style", value: "Moderne" }
        },
        stock: 1,
        description: "La sculpture en métal est une pièce décorative unique et artistique. Fabriquée à partir de métal de haute qualité, chaque sculpture est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette sculpture est idéale pour ajouter une touche artistique et une esthétique moderne à votre décoration intérieure.",
        tags: ["sculpture", "métal", "moderne"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/figurine-iron-musicien-jouant-flute-fond-blanc_460848-13011.jpg",
            gallery: []
        },
    },
    {
        name: "Scultpure en Métal",
        price: 75.00,
        details: {
            material: { label: "Matériau", value: "Métal" },
            style: { label: "Style", value: "Moderne" }
        },
        stock: 1,
        description: "La sculpture en métal est une pièce décorative unique et artistique. Fabriquée à partir de métal de haute qualité, chaque sculpture est une pièce unique. Elle offre une esthétique organique et une texture naturelle. Cette sculpture est idéale pour ajouter une touche artistique et une esthétique moderne à votre décoration intérieure.",
        tags: ["sculpture", "métal", "moderne"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/fond-noir-statue-cadres_23-2149872596.jpg",
            gallery: []
        },
    },

    // Produits Boutique 11
    // Épicerie Fine La Saveur Authentique
    {
        name: "Confiture de Fruits Artisanale",
        price: 5.50,
        details: {
            flavor: { label: "Saveur", value: "Fruits rouges" },
            weight: { label: "Poids", value: "250 g" }
        },
        stock: 10,
        description: "La confiture de fruits artisanales est préparée avec des fruits frais et de haute qualité. Elle offre une saveur riche et une texture onctueuse. Disponible dans une variété de saveurs, cette confiture est idéale pour accompagner vos tartines, vos yaourts ou vos desserts. Elle est également un excellent choix pour offrir en cadeau.",
        tags: ["confiture", "fruits", "artisanale"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/confiture-prunes-dans-bocal-verre-pain-grille-fruits_114579-18044.jpg",
            gallery: []
        },
    },
    {
        name: "Miel de Fleurs Sauvages",
        price: 8.50,
        details: {
            flavor: { label: "Saveur", value: "Fleurs sauvages" },
            weight: { label: "Poids", value: "500 g" }
        },
        stock: 5,
        description: "Le miel de fleurs sauvages est récolté à partir de fleurs sauvages de haute qualité. Il offre une saveur riche et une texture onctueuse. Disponible dans une variété de saveurs, ce miel est idéal pour sucrer vos boissons, vos yaourts ou vos desserts. Il est également un excellent choix pour offrir en cadeau.",
        tags: ["miel", "fleurs", "sauvages"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/delicieux-miel-surface-sombre_1150-42249.jpg",
            gallery: []
        },
    },
    {
        name: "Thé Vert Bio",
        price: 10.00,
        details: {
            flavor: { label: "Saveur", value: "Nature" },
            weight: { label: "Poids", value: "100 g" }
        },
        stock: 8,
        description: "Le thé vert bio est préparé à partir de feuilles de thé de haute qualité. Il offre une saveur riche et un arôme délicat. Disponible dans une variété de saveurs, ce thé est idéal pour accompagner vos repas ou pour vous détendre. Il est également un excellent choix pour offrir en cadeau.",
        tags: ["thé", "vert", "bio"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/feuilles-the-outils_23-2148170662.jpg",
            gallery: []
        },
    },

    // Produits Boutique 12
    // Boulangerie Pâtisserie Le Pain Doré
    {
        name: "Pain de Campagne",
        price: 3.50,
        details: {
            flavor: { label: "Saveur", value: "Nature" },
            weight: { label: "Poids", value: "500 g" }
        },
        stock: 15,
        description: "Le pain de campagne est préparé avec de la farine de blé de haute qualité. Il offre une saveur riche et une texture croustillante. Disponible dans une variété de saveurs, ce pain est idéal pour accompagner vos repas ou pour préparer des tartines. Il est également un excellent choix pour offrir en cadeau.",
        tags: ["pain", "campagne", "nature"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/pain-bio-fait-maison_23-2148361965.jpg",
            gallery: []
        },
    },
    {
        name: "Croissant au Beurre",
        price: 2.50,
        details: {
            flavor: { label: "Saveur", value: "Beurre" },
            weight: { label: "Poids", value: "100 g" }
        },
        stock: 10,
        description: "Le croissant au beurre est préparé avec du beurre de haute qualité. Il offre une saveur riche et une texture croustillante. Disponible dans une variété de saveurs, ce croissant est idéal pour accompagner vos boissons chaudes ou pour un petit-déjeuner gourmand. Il est également un excellent choix pour offrir en cadeau.",
        tags: ["croissant", "beurre", "pâtisserie"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/delicieux-croissants-savoureux-planche-bois-petit-dejeuner-continental-traditionnel-granola-aux-fruits-au-miel-fond_1220-1314.jpg",
            gallery: []
        },
    },
    {
        name: "Tarte aux Fruits Frais",
        price: 15.00,
        details: {
            flavor: { label: "Saveur", value: "Fruits frais" },
            weight: { label: "Poids", value: "500 g" }
        },
        stock: 8,
        description: "La tarte aux fruits frais est préparée avec des fruits frais et de haute qualité. Elle offre une saveur riche et une texture fondante. Disponible dans une variété de saveurs, cette tarte est idéale pour accompagner vos repas ou pour un dessert gourmand. Elle est également un excellent choix pour offrir en cadeau.",
        tags: ["tarte", "fruits", "pâtisserie"],
        images: {
            thumbnail: "https://img.freepik.com/photos-gratuite/tarte-aux-fruits-angle-eleve-plaque_23-2148519067.jpg",
            gallery: []
        },
    }
];

const usersData = [
    // Client 1
    {
        lastName: "Renault",
        firstName: "Mathilda",
        email: "mathildarenault@gmail.com",
        password: "$2a$12$Nkr/Ru8B/ncwgCYkMhKkwe8hoUAeTSLGYW.lVpBVGvL5d2T6DgdqC",
        confirmPassword: "$2a$12$bbFjPhBAbB1rk9oEc4tdHOmLbZNDB1xUa0PmUmqi8SDFc8DM7xp/2",
        verified: true,
        role: "artisan",
        verifiedByAdmin: true,
        secretKey: "135404",
    },
    {
        lastName: "Doe",
        firstName: "John",
        email: "johndoe@gmail.com",
        password: "$2a$12$h7glCrlw.9k7Uqi1Fz7/H.5PVbCLi0FsIjx5b5BpfixvRAzo1G8Ve",
        confirmPassword: "$2a$12$AVZHrbyw5NZn3xxAvkKsguysUaFqb.az7ArEUjiKi2fp7OaOypYO.",
        verified: true,
        role: "user",
        verifiedByAdmin: true,
        secretKey: "597384",
    },
];

async function insertFakeData() {
    try {
        // Ajoutez les boutiques dans la base de données
        const insertedShops = await Shop.insertMany(shopsData);

        // Ajoutez les produits dans la base de données avec l'id de la boutique correspondante
        const productsWithShopIds = productsData.map((product, index) => ({ ...product, shop: insertedShops[Math.floor(index / 3)]._id }));
        await Product.insertMany(productsWithShopIds);
        await User.insertMany(usersData);

        console.log('Données fictives insérées avec succès !');
    } catch (error) {
        console.error("Erreur lors de l'insertion des données fictives :", error);
    } finally {
        mongoose.disconnect();
    }
}

insertFakeData();