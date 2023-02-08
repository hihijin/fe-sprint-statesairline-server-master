// POST /book에서 사용할 uuid입니다.
const { v4: uuid } = require('uuid');
// 항공편 예약 데이터를 저장합니다.
let booking = []; //현재 booking은 빈 배열이다. create 메서드로 booking배열을 채워야 한다.

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 예약 데이터를 조회합니다.
  findAll: (req, res) => {
    return res.status(200).json(booking);
  },
  // [GET] /book/:phone 요청을 수행합니다.
  // 요청 된 phone과 동일한 phone 예약 데이터를 조회합니다.
  findByPhone: (req, res) => {
    const {phone} = req.params;
    res.json(booking.filter(v => v.phone === phone));

  },
  // [GET] /book/:phone/:flight_uuid 요청을 수행합니다.
  // 요청 된 id, phone과 동일한 uuid, phone 예약 데이터를 조회합니다.
  findByPhoneAndFlightId: (req,res) => {
    const {phone, flight_uuid} = req.params;
    // TODO:
    res.json(booking.filter(v => v.phone === phone && v.flight_uuid===flight_uuid));
  },
  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  create: (req, res) => {
    // POST /book에서 사용할 booking_uuid입니다.
    const booking_uuid = uuid(); //uuid는 랜덤으로 계속 생성된다.
    //현재 req.body = {filghtuuid, name, phone}만 있고 bookinguuid가 없다.
    //원래 배열안의 객체안에 bookinguuid 프로퍼티를 새로 넣은 새로운 객체를 booking에 넣어줘야 하고,
    //새로운 객체는 create를 했으므로 json문자열로 새로만들어진 객체를 돌려줘야 한다.
    // TODO:
    const newData = {...req.body,booking_uuid};
    booking.push(newData);
    res.json(newData);

  },

  // Optional
  // [DELETE] /book/:booking_uuid 요청을 수행합니다.
  // 요청 된 id, phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteByBookingId: (req, res) => {
    const {booking_uuid} = req.params;
    // TODO:
    booking = booking.filter(v => v.booking_uuid!==booking_uuid);
    res.json(booking_uuid);
  }
};
