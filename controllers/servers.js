import servers from '../models/servers.js'

export const customerServer = async (req, res) => {
  try {
    await servers.create(req.body)
    console.log(req.body)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    }
  }
}

export const ServerDetail = async (req, res) => {
  try {
    const result = await servers.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
