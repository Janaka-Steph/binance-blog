import React from 'react'
import log from 'loglevel'
import Error from 'next/error'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'
import sanitizeHTML from 'sanitize-html'
import {NextPageContext} from 'next'
import Head from 'next/head'
import {getBaseURL} from '../../utils'

type BlogTemplateProps = Post & {
  statusCode: number
}

const BlogTemplate = ({
  title,
  postBody,
  heroImage,
  author,
  creationDate,
  updateDate,
  statusCode,
}: BlogTemplateProps) => {
  function reformatDate(fullDate: any) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  if (statusCode) {
    return <Error statusCode={statusCode}/>
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <article className="blog">
        <figure className="blog__hero">
          <img
            src={heroImage}
            alt={`blog_hero_${title}`}
          />
        </figure>
        <div className="blog__info">
          <h1>{title}</h1>
          <h3>{reformatDate(creationDate)}</h3>
          {
            updateDate && <h3>{`Last modified ${reformatDate(updateDate)}`}</h3>
          }
        </div>
        <div
          className="blog__body"
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(draftToHtml(postBody)),
          }}
        />
        <h2 className="blog__footer">
          Written By:
          {' '}
          {author}
        </h2>
      </article>

      <style jsx={true}>
        {`
        .blog h1 {
          margin-bottom: .7rem;
        }
        
        .blog__hero {
          min-height: 300px;
          height: 60vh;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .blog__hero img {
          margin-bottom: 0;
          object-fit: cover;
          min-height: 100%;
          min-width: 100%;
          object-position: center;
        }
        
        .blog__info {
          padding: 1.5rem 1.25rem;
          width: 100%;
          max-width: 768px;
          margin: 0 auto;
        }
        .blog__info h1 {
          margin-bottom: 0.66rem;
        }
        .blog__info h3 {
          margin-bottom: 0;
        }
        
        .blog__body {
          width: 100%;
          padding: 0 1.25rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blog__body a {
          padding-bottom: 1.5rem;
        }
        .blog__body:last-child {
          margin-bottom: 0;
        }
        .blog__body h1 h2 h3 h4 h5 h6 p {
          font-weight: normal;
        }
        .blog__body p {
          color: inherit;
        }
        .blog__body ul {
          list-style: initial;
        }
        .blog__body ul ol {
          margin-left: 1.25rem;
          margin-bottom: 1.25rem;
          padding-left: 1.45rem;
        }
        
        .blog__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.25rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        .blog__footer h2 {
          margin-bottom: 0;
        }
        .blog__footer a {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .blog__footer a svg {
          width: 20px;
        }
        
        @media (min-width: 768px) {
          .blog {
            display: flex;
            flex-direction: column;
          }
          .blog__body {
            max-width: 800px;
            padding: 0 2rem;
          }
          .blog__body span {
            width: 100%;
            margin: 1.5rem auto;
          }
          .blog__body ul ol {
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .blog__hero {
            min-height: 600px;
            height: 75vh;
          }
          .blog__info {
            text-align: center;
            padding: 2rem 0;
          }
          .blog__info h1 {
            max-width: 500px;
            margin: 0 auto 0.66rem auto;
          }
          .blog__footer {
            padding: 2.25rem;
          }
        }
        
        @media (min-width: 1440px) {
          .blog__hero {
            height: 70vh;
          }
          .blog__info {
            padding: 3rem 0;
          }
          .blog__footer {
            padding: 2rem 2rem 3rem 2rem;
          }
        }
      `}
      </style>
    </>
  )
}

BlogTemplate.getInitialProps = async ({query, req}: NextPageContext) => {
  let post
  try {
    const {slug} = query
    const res = await axios.get(`/api/blog/${slug}`, {baseURL: getBaseURL(req)})
    post = res.data
  } catch (err) {
    log.error(err)
    return {
      statusCode: 500,
    }
  }

  return {
    ...post,
  }
}

export default BlogTemplate
