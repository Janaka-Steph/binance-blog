import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import log from 'loglevel'
import BlogList from '../components/BlogList'

type HomeProps = {
  posts: [Post]
}

const Home = ({posts}: HomeProps) => (
  <>
    <Head>
      <title>In-Depth Blockchain Research And Hot Crypto News - Binance Research</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>

    <BlogList posts={posts}/>
  </>
)

Home.getInitialProps = async () => {
  // Get posts from database
  let posts = {}
  try {
    const res = await axios('http://localhost:3000/api/blog')
    posts = await res.data
  } catch (err) {
    log.error(err)
  }

  return {
    posts: posts,
  }
}

export default Home
