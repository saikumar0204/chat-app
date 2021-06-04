const moment= require('moment')

var formatMessage=(username,text)=>{
  return {
    username,
    text,
    time:moment().format('h:mm a')
  }
}

module.exports= formatMessage