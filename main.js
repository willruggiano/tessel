import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'

let server = http.createServer()
let app = express()
module.exports = app

const PORT = 1337
let indexHtmlPath = path.join(__dirname, 'index.html')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.on('request', app)

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})

app.get('/', (req, res, next) => {
  res.status(200).sendFile(indexHtmlPath)
})

submit = () => {
  let exec = require('child_process').exec
  exec('tessel run', (error, stdout, stderr) => {
    console.log('stdout:',stdout)
    console.log('stderr:',stderr)
    if (error !== null) console.log('exec error:',error)
  })
}

app.get('/submit', (req, res, next) => {
  submit()
  res.redirect('/')
  res.end()
})



// app.post('/upload', (req, res, next) => {
//   console.log('request received...')
//
//   let imageData = new Buffer(0)
//
//   req.on('data', (chunk) => {
//     imageData = Buffer.concat([imageData, chunk])
//   })
//
//   req.on('end', () => {
//     fs.writeFile(`./images/${Date.now().toString()}.jpg`, imageData)
//   })
// })
