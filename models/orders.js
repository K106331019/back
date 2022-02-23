import mongoose from 'mongoose'
import validator from 'validator'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: 'products',
          required: [true, '缺少商品ID']
        },
        quantity: {
          type: Number,
          required: [true, '缺少商品數量']
        }
      }
    ]
  },
  // 訂單日期
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    unique: true
  },
  phone: {
    type: Number,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    validator: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  message: {
    type: String
  },
  pay: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('orders', orderSchema)
