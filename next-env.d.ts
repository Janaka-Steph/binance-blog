/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next-connect'

type Post = mongoose.Document & {
  _id: mongodb.ObjectID
  title: string
  author: string
  postBody: mongodb.Mixed
  creationDate: Date
  updateDate?: Date
  heroImage?: string
  slug: string
}
