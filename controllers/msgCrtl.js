require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID_TWILIO.toString()
const authToken = process.env.AUTHTOKEN_TWILIO.toString()
const client = require('twilio')(accountSid, authToken)

module.exports = {
    client
};