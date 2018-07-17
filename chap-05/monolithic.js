const http = require('http');
const url = require('url');
const queryString = require('querystring');

// 모듈들 로드 
const members = require('./monolithic_members.js');
const goods = require('./monolithic_goods.js');
const purchases = require('./monolithic_purchases.js');

var server = http.createServer((req, res) => {
  var method = req.method;
  var uri = url.parse(req.url, true);
  var pathname = uri.pathname;
  
  // POST와 PUT는 data와 end이벤트로 파라미터를 얻을 수 있다.
  if( method === 'POST' || method === 'PUT') {
    var body = '';
    req.on('data', function(data){
      body += data;
    });

    req.on('end', function() {
      var params;
      if(req.headers['content-type'] == 'application/json') {
        params = JSON.parse(body);
      } else {
        params = queryString.parse(body);
      }

      onRequest(res, method, pathname, params);

    });

  } else {
    // GET과 DELETE는 query 정보를 읽음
    onRequest(res, method, pathname, uri.query);
  }

}).listen(8000);

/**
 * 요청에 대해 회원관리, 상품관리, 구매 관리 모듈별로 분기
 * @param  res 
 * @param  method 
 * @param  pathname uri
 * @param  params  입력파라미터 
 */
function onRequest(res, method, pathname, params) {
  switch(pathname) {
    case '/members' :
      members.onRequest(res,method,pathname, params, response);
      break;
    case '/goods' :
      goods.onRequest(res,method,pathname, params, response);
      break;
    case '/purchases' :
      purchases.onRequest(res,method,pathname, params, response);
      break;
    default : 
      res.writeHead(404);
      return res.end();    
  }
}
/**
 * HTTP헤더에 JSON형식으로 응답
 * @param res response  객체 
 * @param packet 결과 파라미터
 */
function response(res, packet) {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify(packet)); 
}