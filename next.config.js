const glob = require('glob')
require('dotenv').config({path: '.env.build'})

const imgPaths = glob.sync('public/images/**/*.{jpg,jpeg}')

module.exports = ({
  env: {
    MONGODB_PASS: process.env.MONGODB_PASS,
    IMG_PATHS: imgPaths
  }
})
