import express from 'express'
import apiRoutes from './usersRoutes.js'
import verifiedRoutes from './verifiedRoutes.js'
import reservationRoutes from './reservationRoutes.js'
const router = express.Router()

router.use('/api', apiRoutes)
router.use('/verified', verifiedRoutes)
router.use('/api/reservations', reservationRoutes)

export default router;