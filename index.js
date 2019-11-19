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

let usersJoined = []

function onListen () {
  console.log(`Listening on port 4000`)
}

const server = app.listen(4000, onListen)
io = socketIo.listen(server)

io.on('connection', function(socket){
  console.log('a user connected')

  socket.on('newUser',function(user_name){
    console.log(user_name)
    usersJoined.push(user_name)
    socket.emit('addUserToChat', usersJoined)
  })
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
})



router.post('/messages', (req, res) => {
  const user_message = req.body.message
  const message = {
    user_name: user_message.user_name,
    text: user_message.text
  }
  io.emit('newMessage', message)
})

