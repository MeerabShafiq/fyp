const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const request = require('requests')


exports.PaymentCheck = async(req,res)=>{

const URL = toString('https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/CashDeposit/CashDeposit')
    const options = {
        method: 'POST',
        URL: URL,
        headers: {
          'X-IBM-Client-Id': '88996644-d975-4058-885e-2b34286812a4',
          'X-IBM-Client-Secret': '1c48aa28-2614-486f-aa2c-cbc86cc7ab51',
          'content-type': 'application/json',
          accept: 'application/json'
        },
       
      };
  
      request(options, function (error, response, body) {
        if (error) 
        {
       
          throw new Error(error);
        }
        else{
          console.log(body);
        }
     
      });
    
        
    
}


