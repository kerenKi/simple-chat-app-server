const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')

const router = new express.Router()

const app = express()

app
.use(cors())
.use(bodyParser.json())
.use(router)


function onListen () {
  console.log(`Listening on port 4000`)
}

const server = app.listen(4000, onListen)
io = socketIo.listen(server)

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
})

router.post('/messages', (req, res) => {
  console.log(req.body)
  const user_message = req.body.message
  const message = {
    user_name: user_message.user_name,
    text: user_message.text
  }
  console.log('message: ', message)
  io.emit('newMessage', message)
})

