const http = require('http'); // http 모듈 로드

const server = http.createServer( (req, res) => { // 인스턴스 생성
  res.end('Hello world'); // 응답
});

server.listen(8000); // 8000번 포트로 리슨