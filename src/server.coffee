express = require 'express'
app = express()
server = require('http').createServer(app)

server.listen 1234

app.use express.static('public')
app.use '/js', express.static('lib/client')

console.log "listening on port 1234"