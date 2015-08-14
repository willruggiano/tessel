import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

let server = http.createServer()
let app = express()

const PORT = 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.on('request', app)

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})

app.post('/upload', (req, res, next) => {
  console.log('request received...')

  let imageData = new Buffer(0)

  req.on('data', (chunk) => {
    imageData = Buffer.concat([imageData, chunk])
  })

  req.on('end', () => {
    fs.writeFile(`./${Date.now().toString()}.jpg`, imageData)
  })
})
