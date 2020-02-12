require('dotenv').config({path: '.env.build'})

module.exports = ({
  env: {
    MONGODB_PASS: process.env.MONGODB_PASS
  }
})
