import nextConnect from 'next-connect'
import {ObjectID} from 'bson'
import log from 'loglevel'
import middleware from '../../middleware/database'

const handler = nextConnect()
handler.use(middleware)

handler.get(async (req: any, res: any) => {
  const defaultData: Post = {_id: new ObjectID(), author: '', date: new Date(), heroImage: '', title: '', content: ''}
  const doc = await req.db.findOne() || defaultData
  await res.json(doc)
})

handler.post((req: any, res: any) => {
  const post: Post = req.body
  req.db.updateOne({title: post.title}, {$set: post}, {upsert: true})
    .then(() => {
      log.info('Blog post saved or updated!')
    })
    .catch((err: any) => {
      log.error(err)
    })
  res.end()
})

export default handler
