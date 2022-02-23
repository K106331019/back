import mongoose from 'mongoose'
import validator from 'validator'

const serverSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
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
  finish: {
    type: Boolean
  }
}, { versionKey: false })
export default mongoose.model('servers', serverSchema)
