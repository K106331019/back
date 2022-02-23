import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  customerServer,
  ServerDetail
} from '../controllers/servers.js'

const router = express.Router()

router.post('/', content('application/json'), customerServer)
router.get('/all', auth, admin, ServerDetail)

export default router
