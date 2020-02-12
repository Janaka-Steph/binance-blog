import nextConnect from 'next-connect'
import log from 'loglevel'
import mongoose from 'mongoose'
import {generateSlugFromTitle} from '../utils'

const connectionString = `mongodb+srv://steph_atlas:${process.env.MONGODB_PASS}@cluster0-8bl57.gcp.mongodb.net/binance`

const Schema = mongoose.Schema
const PostSchema = new Schema({
  title: {type: String, required: true, max: 100, trim: true},
  author: {type: String, required: true, max: 100, trim: true},
  slug: {type: String, max: 50, trim: true},
  postBody: {type: Schema.Types.Mixed, required: true},
  creationDate: {type: Date, default: Date.now},
  updateDate: {type: Date},
  heroImage: {type: String, max: 50, trim: true},
})

PostSchema.pre('save', function preCb(next) {
  (this as any).slug = generateSlugFromTitle((this as any).title)
  next()
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
  req.db = mongoose.models.Post || mongoose.model('Post', PostSchema)
  next()
}

const middleware = nextConnect()
middleware.use(database as any)

export default middleware
