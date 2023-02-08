const flights = require('../repository/flightList');
const fs = require('fs');

//객체를 모듈의 형태로 내보낸다. 다른 파일에 써야 하므로!
module.exports = {
  // [GET] /flight
  // 요청 된 파라미터 departure_times, arrival_times 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  // 요청 된 파라미터 departure, destination 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  //req.query는 해당 라우트 경로에서 각각의 'query string'을 파라미터로 갖는 객체 프로퍼티이다.
  findAll: (req, res) => {
    const { departure_times, arrival_times, destination, departure } = req.query;
    //req.query.departure_times => departure_times값이 나온다. 구조분해할당으로 departure_times를 불러와도 같은 값이 나옴
    // TODO:
    let filtered = [...flights]; //스프레드문법으로 배열안에 flights의 객체를 불러옴
    for(const key in req.query){ //req.query라는 객체에 키값인 departure_times, arrival_times, destination, departure를 차례로 불러온다.
      filtered = filtered.filter(v => v[key]===req.query[key]);
      //flights[departure]가 req.query[departure]와 같다면 flights[departure]가 있는 항공편목록이 출력된다.
    }
    
    /*원래 코드, for문을 돌려 위에 코드처럼 줄임
    if(departure_times){
      filtered = filtered.filter(v => v.departure_times===departure_times);
    }
    if(arrival_times){
      filtered = filtered.filter(v => v.arrival_times===arrival_times);
    }
    if(destination){
      filtered = filtered.filter(v => v.destination===destination);
    }
    if(departure){
      filtered = filtered.filter(v => v.departure==departure);
    }
    */
    return res.json(filtered); //필터돤 항공편목록이 json데이터로 리턴
  },
  // [GET] /flight/:uuid
  // 요청 된 uuid 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  //'api/posts/:id'라는 라우터 경로가 있을 때, 'id'는 'req.params.id'로 불러올 수 있다.
  //req 객체에 'parameter'라는 프로퍼티가 있고, 그 프로퍼티의 'id'라는 프로퍼티로 접근해 요청을 보낼 수 있는 것.
  findById: (req, res) => {
    const { uuid } = req.params;
    //req.params.uuid => uuid값이 나온다.
    // TODO:
    res.json(flights.filter(v => v.uuid===uuid));
  },

  // Advanced
  // [PUT] /flight/:uuid 요청을 수행합니다.
  // 요청 된 uuid 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  //같은 uuid는 같은 데이터를 가지게 한다.
  update: (req, res) => {
    const { uuid } = req.params;
    const bodyData = req.body;
     // TODO:
     //객체의 키값바꾸는 방법 : delete.Object.assign(기존 객체, 새로운 객체)
    const newBody = flights.filter(v => v.uuid===uuid); //id필터된 데이터, 없을 수도 있다. 현재 객체를 담은 배열
    if(newBody.length>0){ //id필터된 항공편목록이 있다면 
      for(let i=0; i<newBody.length; i++){ //동일한 uuid를 가진 항공편목록이 여러개일 수 있다.
        delete Object.assign(newBody[i], bodyData); //객체의 키값바꾸는 방법 : delete.Object.assign(기존 객체, 새로운 객체)
        res.json(newBody[i]);//newbody는 배열, newBody[i]는 i번째 객체
      }
    }
  }
};


/*
//put 레퍼런스 코드 (재할당을 해도되고 이 방법을 써도 된다)
const idx = flights.findIndex((el) => el.uuid === uuid); //동일한 id를 가진 데이터들 중 첫번째 인덱스를 찾음
const newFlight = {
  ...flights[idx],
  ...bodyData,
}; //동일한 키와 값이 있다면 뒤에 있는 키로 값이 변한다.
flights.splice(idx,1,newFlight); //동일한 id를 가진 첫번째 idx의 데이터는 지우고 그 자리에 새로운 데이터(bodydata)를 넣어준다.
return res.json(newFlight);
*/