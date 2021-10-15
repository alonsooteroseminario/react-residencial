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
    async getRow(email) {
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
        console.log(rows)
    
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (row.email == email) {
                console.log(row.user_name);
                console.log(row.password);
            }
        };
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