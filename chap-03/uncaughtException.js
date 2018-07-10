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

// 모든 스레드에서 발생하는 예외처리 
process.on('uncaughtException', error => {
  console.log('uncaughtException');
});