const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());
const request = require('requests')


exports.PaymentCheck = async(req,res)=>{
      const headers = {
        'X-IBM-Client-Id': 'ce1d135d-9b55-4b3f-829b-dc5e924fdf25',
        'X-IBM-Client-Secret': '1c48aa28-2614-486f-aa2c-cbc86cc7ab51',
        'X-Channel': 'REPLACE_THIS_VALUE',
        'X-Hash-Value': 'REPLACE_THIS_VALUE',
        'content-type': 'application/json',
        accept: 'application/json'
      };
      
      const data = {
        MSISDN: 'tovj'
      };
      
      axios.post('https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/CashDeposit/CustomerTitleFetch', data, { headers })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      
}


