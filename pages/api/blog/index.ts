import nextConnect from 'next-connect'
import {ObjectID} from 'bson'
import log from 'loglevel'
import glob from 'glob'
import {NextApiRequest, NextApiResponse} from 'next'
import {Model} from 'mongoose'
import middleware from '../../../middleware/database'
import {generateSlugFromTitle} from '../../../utils'

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

/**
 * Get all blog posts
 */
handler.get(async (req: NextApiReq, res: NextApiResponse) => {
  try {
    const doc = await req.db.find() || defaultData
    res.status(200).json(doc)
  } catch (err) {
    log.error(err)
    res.status(500).end()
  }
})

/**
 * Save a blog post
 */
handler.post((req: NextApiReq, res: NextApiResponse) => {
  const post: Post = req.body
  if (!post.title) {
    log.error('Title is missing')
    return
  }

  try {
    req.db.findOne({slug: generateSlugFromTitle(post.title)})
      .then(async (p: any) => {
        if (p) {
          // Update post
          p.tile = post.title
          p.author = post.author
          p.postBody = post.postBody
          p.updateDate = new Date()
          await p.save()
          log.info('Blog post updated!')
        } else {
          // A random image is selected! TODO
          const imgPaths = glob.sync('public/images/**/*.{jpg,jpeg}')
          const randomImgPath = imgPaths[Math.floor(Math.random() * imgPaths.length)]
          post.heroImage = randomImgPath.substring(randomImgPath.indexOf('/'))
          // Create new post
          const doc = await req.db.create(post)
          await doc.save()
          log.info('Blog post created!')
          res.status(200).end()
        }
      })
  } catch (err) {
    log.error(err)
    res.status(500).end()
  }
})

export default handler
