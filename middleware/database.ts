import nextConnect from 'next-connect'
import log from 'loglevel'
import mongoose from 'mongoose'
import {generateSlugFromTitle} from '../utils'

const db = mongoose.connection
const connectionString = `mongodb+srv://steph_atlas:${process.env.MONGODB_PASS}@cluster0-8bl57.gcp.mongodb.net/binance`

if (db.readyState === 0) {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

db.on('connected', () => {
  log.info('Connected to MongoDB database')
})
db.on('disconnected', () => {
  log.warn('Mongodb connection disconnected')
})
db.on('error', (err) => {
  log.error('Error in mongodb connection:', err)
})

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
  req.db = mongoose.models.Post || mongoose.model('Post', PostSchema)
  next()
}

const middleware = nextConnect()
middleware.use(database as any)

export default middleware
