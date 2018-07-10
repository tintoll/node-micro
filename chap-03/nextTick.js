// 비동기적 콜백하려면 process.nextTick함수를 이용한다. 
// process.nextTick는 비동기 처리를 위해 node.js 내부의 스레드 풀로 다른 스레드 위에서 콜백 함수를 동작합니다.

function func(callback) {
  process.nextTick(callback, 'callback!!');
}

// try~catch는 같은 스레드 위에서만 동작하기때문에 서로 다른 스레드간의 예외처리가 불가합니다. 
try {
  func(param => {
    a.a = 0; // 의도적 예외발상
  });
} catch(e) {
  console.log('exception!!');
}