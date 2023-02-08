const { findAll, findById, update } = require('../controller/flightController');//해당 객체를 모듈로 불러온다. 구조분헤할당으로 불러온다!
const express = require('express');
const router = express.Router();

router.get('/', findAll);

router.get('/:uuid', findById);

router.put('/:uuid', update);

module.exports = router;
