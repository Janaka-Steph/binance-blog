import React from 'react'
import Header from './Header'

type LayoutProps = {
  children: any
}

const Layout = ({children}: LayoutProps) => (
  <div className="layout">
    <Header/>

    <div className="content">
      {children}
    </div>

    <style jsx={true}>
      {`
          .layout {
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .content {
            flex-grow: 1;
          }
          @media (min-width: 768px) {
            .layout {
              display: block;
            }
            .content {
              flex-grow: 0;
              width: 70vw;
              margin-left: 30vw;
            }
          }
      `}
    </style>
  </div>
)

export default Layout
