import React from 'react'
import Head from 'next/head'
import matter from 'gray-matter'
import axios from 'axios'
import BlogList from '../components/BlogList'
import log from 'loglevel'

type HomeProps = {
  allBlogs: any
}

const Home = ({allBlogs}: HomeProps) => (
  <>
    <Head>
      <title>In-Depth Blockchain Research And Hot Crypto News - Binance Research</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>

    <BlogList allBlogs={allBlogs}/>
  </>
)

Home.getInitialProps = async () => {
  // Get posts from database
  let dbData = {}
  try {
    const res = await axios('http://localhost:3000/api/blog')
    dbData = await res.data
    console.log('dbData--', dbData)
  } catch (err) {
    log.error(err)
  }


  // get posts & context from folder
  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)
    return keys.map((key: string, index: string | number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        document,
        slug,
      }
    })
    // @ts-ignore
  })(require.context('../posts', true, /\.md$/))

  return {
    allBlogs: posts,
    dbData: dbData,
  }
}

export default Home
