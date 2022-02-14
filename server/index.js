const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  console.log('connnected')
  socket.on('message', message => {
    console.log(message)
    io.emit('message', {message})
  })
  socket.on('updateForm', InputReturn => {
    io.emit('updateForm', { InputReturn })
  })
  socket.on('selectForm', form => {
    io.emit('selectForm', { form })
  })
  socket.on('ctrlStats', stat => {
    console.log(stat)
    io.emit('ctrlStats', { stat })
  })
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})
