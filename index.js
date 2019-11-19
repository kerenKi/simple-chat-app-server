const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = new express.Router()

const message = {
  user_name: '',
  text: ''
}

router.post('/messages', (req, res) => {
  console.log(req.body)
})

const app = express()

app
.use(cors())
.use(bodyParser.json())
.use(router)


function onListen () {
  console.log(`Listening on port 4000`)
}

server = app.listen(4000, onListen)
