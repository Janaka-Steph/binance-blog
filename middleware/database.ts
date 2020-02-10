import nextConnect from 'next-connect'
import log from 'loglevel'
import mongoose from 'mongoose'

const connectionString = `mongodb+srv://steph_atlas:${process.env.MONGODB_PASS}@cluster0-8bl57.gcp.mongodb.net/binance`
const Schema = mongoose.Schema
const blogSchema = new Schema({
  title: {type: String, required: true, max: 100, trim: true},
  author: {type: String, required: true, max: 100, trim: true},
  content: {type: String, required: true, max: 500, trim: true},
  date: {type: Date, default: Date.now},
  heroImage: {type: String, required: true, max: 50, trim: true},
})

function database(req: any, res: any, next: any) {
  const db = mongoose.connection

  db.on('error', (err) => {
    log.error('Error in mongodb connection:', err)
  })

  if (db.readyState !== 1) {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => log.info('Connected to database'))
      .catch((err) => log.error(err))
  }
  req.db = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
  next()
}

const middleware = nextConnect()
middleware.use(database as any)

export default middleware
