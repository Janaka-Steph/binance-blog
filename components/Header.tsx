import React from 'react'
import Link from 'next/link'

const Header = () => (
  <header className="header">
    <nav
      className="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <Link href="/">
        <h1>
          <img src="/binance_logo.svg" alt="Binance logo"/>
        </h1>
      </Link>

      <Link href="/admin">
        <h2>Admin</h2>
      </Link>
    </nav>

    <style jsx={true}>
      {`
          .header {
            background-color: #08121d;
          }
          h1, h2 {
           &:hover {
              cursor: pointer;
            }
          }
          h1 {
            img {
              width: 90%;
            }
          }
          h2 {
            color: #f0b909;
            font-size: 2rem;
          }
          nav {
            padding: 1.5rem 1.25rem;
            border-bottom: 1px solid #ebebeb;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
          }
          @media (min-width: 768px) {
            .header {
              height: 100vh;
              position: fixed;
              left: 0;
              top: 0;
            }
            .nav {
              padding: 2rem;
              width: 30vw;
              height: 100%;
              border-right: 1px solid #ebebeb;
              border-bottom: none;
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}
    </style>
  </header>
)

export default Header
