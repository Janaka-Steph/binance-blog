import nextConnect from 'next-connect'
import {ObjectID} from 'bson'
// import log from 'loglevel'
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

handler.get(async (req: any, res: any) => {
  const doc = await req.db.find({slug: req.query.slug}) || defaultData
  await res.json(doc[0])
})

export default handler
