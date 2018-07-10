function func(callback) {
  callback('callback!!');
}

func(param => {
  console.log(param);
});


// 위 예제는 비동기 프로그래밍 처럼 보이지만 동일한 스레드 위에서 동기적으로 동작합니다. 