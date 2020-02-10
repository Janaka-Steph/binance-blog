import React from 'react'
import axios from 'axios'
import log from 'loglevel'

const Admin = () => {
  const handleClick = () => {
    const data = {
      title: 'test title 2',
      author: 'Stéphane Roche',
      date: new Date(),
      heroImage: '/norris-niman-iceland.jpg',
      // eslint-disable-next-line no-useless-escape,max-len
      content: 'The Joshua tree is also called _izote de desierto_ (Spanish, "desert dagger").[\[6\]](https://en.m.wikipedia.org/wiki/Yucca_brevifolia#cite_note-ITIS-6) It was first formally described in the botanical literature as _Yucca brevifolia_ by [George Engelmann](https://en.m.wikipedia.org/wiki/George_Engelmann "George Engelmann") in 1871 as part of the Geological Exploration of the 100th meridian (or "[Wheeler Survey](https://en.m.wikipedia.org/wiki/Wheeler_Survey "Wheeler Survey")").[\[7\]](https://en.m.wikipedia.org/wiki/Yucca_brevifolia#cite_note-IPNI-7)',
    }

    axios.post('/api/blog', data)
      .then(function (response) {
        log.debug('POST response /api/blog:', response)
      })
      .catch(function (error) {
        log.error('POST response /api/blog:', error)
      })
  }

  return (
    <>
      <div>Edit</div>
      <button
        onClick={handleClick}
        type="button"
      >
        Save Post
      </button>
    </>
  )
}

export default Admin
