
const sockets =[]


function notify(){
    sockets.forEach(socket=>{
        socket.emit('message','hello world')
    })
}



export default {sockets,notify};