import React from 'react'
import Head from 'next/head'
import matter from 'gray-matter'
import BlogList from '../components/BlogList'

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

Home.getInitialProps = () => {
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
  }
}

export default Home
