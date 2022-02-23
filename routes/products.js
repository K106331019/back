import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import {
  create,
  getProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  delProduct
}
  from '../controllers/products.js'

const router = express.Router()

router.post('/', auth, admin, content('multipart/form-data'), upload, create)
// 只有上架的
router.get('/', getProducts)
// 所有商品
router.get('/all', auth, admin, getAllProducts)
// 一個商品
router.get('/:id', getProductById)
router.patch('/:id', auth, admin, content('multipart/form-data'), upload, updateProductById)
router.delete('/:id', auth, admin, delProduct)

export default router
