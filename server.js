const express = require('express')
// import { registerRouter } from './backend/router.js'
// console.log(registerRouter,'数据');
const registerRouter = require('./backend/router.js')


async function createServer(){
  const app = express()
  registerRouter(app)
  app.listen(4000, function(err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:4000' + '\n')
  })
}
createServer()