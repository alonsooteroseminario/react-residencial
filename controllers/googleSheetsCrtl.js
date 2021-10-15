const { GoogleSpreadsheet } = require('google-spreadsheet')
const fs = require('fs')
const Users = require('../models/userModel')


const getSheetID = async () => {
    let user = await Users.findOne({role: 1})
    return user.sheetId
}

class GoogleSheet {
    constructor() {
        // Credentials for the service account
        this.CREDENTIALS = JSON.parse(fs.readFileSync('./googleConfig.json'));
    }
    async getRow() {
        this.doc = new GoogleSpreadsheet(await getSheetID());
        // use service account creds
        await this.doc.useServiceAccountAuth({
            client_email: this.CREDENTIALS.client_email,
            private_key: this.CREDENTIALS.private_key
        });
    
        // load the documents info
        await this.doc.loadInfo();
    
        // Index of the sheet
        let sheet = this.doc.sheetsByIndex[0];
    
        // Get all the rows
        let rows = await sheet.getRows();
        // console.log(rows)


        let list = []

        // console.log(rows)

    
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            // console.log(row._rawData[0])
            let obj = {}
            
            obj.email = row._rawData[0]
            obj.nombre = row._rawData[1]
            obj.apellido = row._rawData[2]
            obj.dni = row._rawData[3]
            obj.telefono = row._rawData[4]
            obj.ciudad = row._rawData[5]
            obj.habitaciones = row._rawData[6]
            obj.fechaIngreso = row._rawData[7]
            obj.horaIngreso = row._rawData[8]
            obj.horaSalida = row._rawData[9]
            obj.formaPago = row._rawData[10]
            obj.horaRegistro = row._rawData[11]

            list.push(obj)
        };

        return list
    }
    async addRow(rows) {

        this.doc = new GoogleSpreadsheet(await getSheetID());
        // use service account creds
        await this.doc.useServiceAccountAuth({
            client_email: this.CREDENTIALS.client_email,
            private_key: this.CREDENTIALS.private_key
        });
    
        await this.doc.loadInfo();
    
        // Index of the sheet
        let sheet = this.doc.sheetsByIndex[0];
    
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            await sheet.addRow(row);
        }
    }
    async updateRow(keyValue, oldValue, newValue) {
        this.doc = new GoogleSpreadsheet(await getSheetID());
        // use service account creds
        await this.doc.useServiceAccountAuth({
            client_email: this.CREDENTIALS.client_email,
            private_key: this.CREDENTIALS.private_key
        });
    
        await this.doc.loadInfo();
    
        // Index of the sheet
        let sheet = this.doc.sheetsByIndex[0];
    
        let rows = await sheet.getRows();
    
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (row[keyValue] === oldValue) {
                rows[index][keyValue] = newValue;
                await rows[index].save();
                break; 
            }
        };
    }
    async deleteRow(keyValue, thisValue) {
        this.doc = new GoogleSpreadsheet(await getSheetID());
        // use service account creds
        await this.doc.useServiceAccountAuth({
            client_email: this.CREDENTIALS.client_email,
            private_key: this.CREDENTIALS.private_key
        });
    
        await this.doc.loadInfo();
    
        // Index of the sheet
        let sheet = this.doc.sheetsByIndex[0];
    
        let rows = await sheet.getRows();
    
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (row[keyValue] === thisValue) {
                await rows[index].delete();
                break; 
            }
        };
    }
}
module.exports = GoogleSheet;