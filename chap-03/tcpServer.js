var net = require('net');
var server = net.createServer( socket => { // tcp 서버를 만듬 
  socket.end('tcp world'); // 응답
});

server.on('error', err => { // 네트워크 에러처리 
  console.log(err);
});

server.listen(9000, () => {
  console.log('listen', server.address()); 
});