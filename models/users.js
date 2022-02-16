import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '信箱不能為空'],
    unique: true,
    validator: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  password: {
    type: String,
    unique: true,
    required: [true, '密碼不能為空']
  },
  name: {
    type: String,
    required: [true, '姓名不能為空'],
    unique: true
  },
  // date: {
  //   type: Number,
  //   required: [true, '生日不能為空']
  // },
  // gender: {
  //   type: String,
  //   required: [true, '性別不能為空']
  // },
  role: {
    // 0=會員
    // 1=管理員
    type: Number,
    default: 0

  },
  tokens: {
    type: [String]

  },
  cart: {
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
  }
}, { versionKey: false })

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 10) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度不正確' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 10) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度不正確' }))
      next(error)
      return
    }
  }
  next()
})

export default mongoose.model('users', userSchema)
