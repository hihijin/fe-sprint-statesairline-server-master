const express = require('express');//require라는 키워드로 express모듈 불러와서 express라는 변수에 담아줌
const cors = require('cors');//cors에러를 없애기 위해 cors모듈 불러오기
const app = express();

// 모든 서버는 요청을 받을수 있는 포트 번호를 필요로 합니다.

// HTTP server의 표준 포트는 보통 80 번 이지만, 보통 다른 서버에서 사용중이기 때문에 접근할 수 없습니다.
// 따라서 우리는 보통 테스트 서버 포트로 3000, 8080, 1337 등을 활용합니다.

// PORT는 아파트의 호수와도 같습니다. 서버로 요청을 받기 위해서는 다음과 같이 포트 번호를 설정 합니다.
// (* 때에 따라 다른 포트번호를 열고 싶다면, 환경 변수를 활용 하기도 합니다.)
const port = 3001;

const flightRouter = require('./router/flightRouter');
const bookRouter = require('./router/bookRouter');
const airportRouter = require('./router/airportRouter');

app.use(cors()); //모든 요쳥에 cors 설정(최상단에 작성해야 인식된다.)
//'Access-Control-Allow-Origin':'*'과 같다.
app.use(express.json()); //모든 요청에 body를 갖고오기 위한 미들 웨어
//적용시키면 모든 요청에 대해 req.body가 불러와진다.
//strict : false 객체, 배열같은 참조자료형 뿐 아니라 모든 데이터를 허용하기 위해 사용

app.use('/flight', flightRouter);
app.use('/book', bookRouter);
app.use('/airport', airportRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome, States Airline!');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => { 
  console.error(err.stack); //err가 발생하면 err가 발생한 stack을 콘솔에 보여준다.
  res.status(500).send({ //500코드는 서버문제
    message: 'Internal Server Error', //send로 클라이언트에게 메세지와 stacktrace를 전달한다.
    stacktrace: err.toString() //err.toString을 하지않고 err.stack을 해도 됨
  });
});

app.listen(port, () => { //포트가 켜진다.
  console.log(`[RUN] StatesAirline Server... | http://localhost:${port}`);
}); //서버가 켜졌는지 확인하는 용도로 콘솔찍음

module.exports = app;
