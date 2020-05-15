const express = require('express')
const { USER_JOINED, MESSAGE_SEND } = require('../src/constants/events')

const router = express.Router()

router.get('/', (request, response) => {
  response.render('index')
})

router.post('/force-join/:name', (request, response) => {
  const io = request.app.get('io')
  const { name } = request.params

  io.emit(USER_JOINED, { user: name, timestamp: Date.now() })
  response.json({ ok: true })
})

router.post('/force-message/:message', (request, response) => {
  const io = request.app.get('io')
  const { message } = request.params

  io.emit(MESSAGE_SEND, { user: 'anonymous', timestamp: Date.now(), message })
  response.json({ ok: true })
})

module.exports = router
