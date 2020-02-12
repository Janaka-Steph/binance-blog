import React from 'react'
import Link from 'next/link'
import draftToHtml from 'draftjs-to-html'
import sanitizeHTML from 'sanitize-html'

type BlogListProps = {
  posts: [Post]
}

const BlogList = ({posts}: BlogListProps) => {
  function reformatDate(fullDate: string | number | Date) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <>
      <ul className="list">
        {posts.length && posts.map((post: Post) => (
          <Link
            key={post.slug}
            href="/blog/[slug]"
            as={`/blog/${post.slug}`}
          >
            <a>
              <li>
                <div className="heroImage">
                  <img src={post.heroImage} alt="random images"/>
                </div>
                <div className="blog__info">
                  <h2>{post.title}</h2>
                  <h3>
                    {reformatDate(post.creationDate)}
                  </h3>
                  <p>
                    {sanitizeHTML(draftToHtml(post.postBody), {allowedTags: []})}
                  </p>
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>

      <style jsx={true}>
        {`
          .list {
            margin-bottom: 0;
          }
          a:hover {
            opacity: 1;
          }
          a:hover li div.heroImage img {
            opacity: 0.8;
            transition: opacity 0.3s ease;
          }
          a:hover li .blog__info h2, a:hover li .blog__info h3, a:hover li .blog__info p {
            transform: translateX(10px);
            transition: transform 0.5s ease-out;
          }
          .heroImage {
            width: 100%;
            height: 33vh;
            overflow: hidden;
            background-color: #000;
          }
          .heroImage img {
            object-fit: cover;
            object-position: 50% 50%;
            opacity: 1;
            transition: opacity 0.3s ease;
            min-height: 100%;
          }
          .blog__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 1.5rem 1.25rem;
            transform: translateX(0px);
            transition: transform 0.3s ease-in;
            border-bottom: 1px solid #ebebeb;
          }
          .blog__info h2, .blog__info h3, .blog__info p {
            transform: translateX(0px);
            transition: transform 0.5s ease-out;
          }
          li {
            opacity: inherit;
            display: flex;
            justify-content: center;
            flex-direction: column;
            min-height: 38vh;
            margin-bottom: 0;
          }
          h2 {
            margin-bottom: 0.5rem;
          }
          h3 {
            margin-bottom: 1rem;
          }
          p {
            max-width: 900px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;  
          }
          @media (min-width: 768px) {
            li {
              min-height: 250px;
              height: 33.333vh;
              flex-direction: row;
            }
            .heroImage {
              height: 100%;
            }
            .heroImage img {
              min-width: 100%;
              height: 100%;
              width: auto;
              min-height: 0;
            }
            .blog__info {
              min-width: 70%;
            }
          }
          @media (min-width: 1280px) {
            .blog__info {
              padding: 3rem;
            }
            h3 {
              margin-bottom: 1.2rem;
            }
          }
        `}
      </style>
    </>
  )
}

export default BlogList
