const express= require('express')
const http= require('http')
const app =express()
const PORT= process.env.PORT||4500
const socketio= require('socket.io')
const formatMessage=require('./utils/messages')
const {userJoin, getCurrentUser,userLeave,getRoomUsers}= require('./utils/users')

app.use(express.static('public'))

const botName= "Admin"

const server= http.createServer(app)
const io= socketio(server)

io.on('connection',socket=>{

 
  socket.on('joinRoom',({username,room})=>{
    const user= userJoin(socket.id,username,room)

    socket.join(room)  
    
  //Welcome current user
  socket.emit('message',formatMessage(botName,"Welcome to the Chat app"))

  //Broadcast when a user connects
  socket.broadcast.to(room).emit('message',formatMessage(botName,`${username} has joined the chat `))

   //Send users and room info
  io.to(room).emit('roomUsers',{
    room:room,
    users:getRoomUsers(room)
  })

  })


  //Runs when user left
  socket.on('disconnect',()=>{
    const user= userLeave(socket.id)
    if(user){
      io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left`))

      //Send users and room info
      io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
      })
    }

  })

  //Listen for chat message
  socket.on('chatMessage',(msg)=>{
    const user= getCurrentUser(socket.id)
    io.to(user.room).emit('message',formatMessage(user.username,msg))
  })
})


server.listen(PORT,()=>{
  console.log(`Server LIstening on port ${PORT}`);
})