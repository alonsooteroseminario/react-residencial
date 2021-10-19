const router = require('express').Router()
const reservaCtrl = require('../controllers/reservaCtrl')

router.post('/reservar/enviar', reservaCtrl.reservar)

module.exports = router