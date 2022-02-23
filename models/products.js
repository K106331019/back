import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品不能為空']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '商品價格不能為空']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  // 是否上架
  sell: {
    type: Boolean,
    default: false
  },
  // 商品分類
  category: { big: '', small: '' }
}, { versionKey: false })
export default mongoose.model('products', productSchema)
