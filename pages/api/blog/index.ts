import nextConnect from 'next-connect'
import {ObjectID} from 'bson'
import log from 'loglevel'
import glob from 'glob'
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

/**
 * Get all blog posts
 */
handler.get(async (req: any, res: any) => {
  const doc = await req.db.find() || defaultData
  await res.json(doc)
})

/**
 * Save a blog post
 */
handler.post((req: any, res: any) => {
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
        }
      })
  } catch (err) {
    log.error(err)
  }
  res.end()
})

export default handler
