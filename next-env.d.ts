/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next-connect'

type Post = {
  _id: mongodb.ObjectID
  title: string
  date: Date
  author: string
  heroImage: string
  content: string
}
