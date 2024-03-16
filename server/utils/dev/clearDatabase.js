import mongoose from "mongoose";

const clearDatabase = async () => {
    try {
        // Connexion à MongoDB
        await mongoose.connect("mongodb://localhost:27018/mongodb");

        // Utiliser la méthode db.dropDatabase() pour supprimer complètement la base de données
        await mongoose.connection.db.dropDatabase();

        console.log("Database dropped successfully!");
    } catch (error) {
        console.error("Error dropping database:", error);
    } finally {
        // Fermer la connexion MongoDB
        await mongoose.connection.close();
    }
};

// Appeler la fonction pour supprimer complètement la base de données
clearDatabase();