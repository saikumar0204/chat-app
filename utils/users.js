var users=[]

function userJoin(id,username,room){
  const user= {
    id,
    username,
    room
  }
  users.push(user)
  return users;
}

function getCurrentUser(id){
  return users.find(user=>user.id==id)
}

//user leaves chat
function userLeave(id){
  var index= users.findIndex(user=>user.id===id)
  if(index!=-1){
    return users.splice(index,1)[0]
  }
  
}

//Get room user details
function getRoomUsers(room){
  return users.filter(user=>user.room===room)
}

module.exports={
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave
}
