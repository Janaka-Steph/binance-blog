import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import log from 'loglevel'
import {NextPageContext} from 'next'
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

Home.getInitialProps = async (ctx: NextPageContext) => {
  // Get posts from database
  let posts = {}
  try {
    const axioscfg = ctx.req ? {baseURL: 'http://localhost:3000'} : {}
    const res = await axios('/api/blog', axioscfg)
    posts = await res.data
  } catch (err) {
    log.error(err)
  }

  return {
    posts: posts,
  }
}

export default Home
