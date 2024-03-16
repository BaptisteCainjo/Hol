import express  from "express";
import { writeEmail, verifyUser, updateVerifiedStatus, writeMailToCompany, verifyUserByAdmin, resendKey, rewriteEmail, writeEmailToArtisan } from "../controllers/authController.js";
const router = express.Router()

router.get("/send-mail", writeEmail)
router.get("/send-mail-artisan", writeEmailToArtisan)
router.get("/resend-mail", rewriteEmail)
router.put("/resend-secret-key", resendKey)
router.get("/user", verifyUser)
router.post("/update", updateVerifiedStatus)
router.get("/send-mail-company", writeMailToCompany)
router.get("/verify-user-by-admin", verifyUserByAdmin)

export default router;