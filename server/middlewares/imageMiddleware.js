import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const limits = {
    fileSize: 2 * 1024 * 1024 // 2 Mo
}

const uploadMiddleware = multer({ storage, fileFilter, limits });

const processImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const filename = `${uuidv4()}.webp`;

        const optimizedBuffer = await sharp(req.file.buffer)
            .resize(800, 600, {
                fit: "cover"
            })
            .webp()
            .toBuffer();

        const outputPath = `uploads/${filename}`;
        await sharp(optimizedBuffer).toFile(outputPath);

        req.file.filename = filename;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erreur lors du traitement de l'image."
        });
    }
}

export { uploadMiddleware, processImage };