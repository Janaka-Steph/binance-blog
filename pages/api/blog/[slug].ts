import nextConnect from 'next-connect'
import {ObjectID} from 'bson'
import log from 'loglevel'
import {NextApiRequest, NextApiResponse} from 'next'
import {Model} from 'mongoose'
import middleware from '../../../middleware/database'

const handler = nextConnect()
handler.use(middleware)

const defaultData: Post = {
  _id: new ObjectID(),
  author: '',
  creationDate: new Date(),
  heroImage: '',
  title: '',
  postBody: '',
  slug: '',
}

type NextApiReq = NextApiRequest & {
  db: Model<Post>
}

handler.get(async (req: NextApiReq, res: NextApiResponse) => {
  try {
    const doc = await req.db.find({slug: req.query.slug}) || defaultData
    res.status(200).json(doc[0])
  } catch (err) {
    log.error(err)
    res.status(500).end()
  }
})

export default (req: NextApiReq, res: NextApiResponse) => handler.apply(req, res)
