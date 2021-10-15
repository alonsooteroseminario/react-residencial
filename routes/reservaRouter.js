const router = require('express').Router()
const reservaCtrl = require('../controllers/reservaCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const Users = require('../models/userModel')

const { client } = require('../controllers/msgCrtl')
const GoogleSheet = require('../controllers/googleSheetsCrtl')
const googleSheet = new GoogleSheet()

const getTelefonoWhatsapp = async () => {
  let user = await Users.findOne({role: 1})
  return user.telefono
}

router.post('/reservar/enviar', async (req, res) => {
    const data = req.body;
    data.horaRegistro = new Date().toTimeString()
  
    console.log(data)
  
    client.messages.create({
      body: `Reserva de ${data.nombre} ${data.apellido} a las ${new Date().toLocaleString()} \n\n
      Mensaje completo: \n\n
      El usuario ${data.nombre} ${data.apellido} hizo una reserva a las ${new Date().toLocaleString()}
                                          
              Email: ${data.email} 
              DNI:  ${data.dni} 
              Teléfono:  ${data.telefono} 
              Ciudad:  ${data.ciudad} 
              Habitaciones:  ${data.habitaciones} 
              Fecha Ingreso: ${data.fechaIngreso} 
              Hora Ingreso: ${data.horaIngreso} 
              Hora Salida: ${data.horaSalida} 
              Forma de Pago: ${data.formaPago} `,
      // mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${await getTelefonoWhatsapp()}`
      })
    .then(message => console.log(message.sid))
    .catch(console.log)  
  
    let rows = [data];
  
    // addRow(rows);
    await googleSheet.addRow(rows)
  
})


module.exports = router