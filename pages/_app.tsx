// Global CSS
import '../assets/global_styles.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// Imports
import React from 'react'
import {AppProps} from 'next/app'
import log from 'loglevel'
import Layout from '../components/Layout'

const App = (
  {
    Component,
    pageProps,
  }: AppProps
) => {
  // Set Log Levels
  if (process.env.NODE_ENV === 'production') {
    log.setLevel('silent')
  } else {
    log.setLevel('trace')
    log.info('Looks like we are in development mode!')
  }

  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default App
