const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const request = require('request');
const Jazzcash = require('jazzcash-checkout');
app.use(cors());



exports.PaymentCheck = async(req,res)=>{
  
  
  
  
  // const XIBMClientId ='f8d8c338-ee8e-4fe5-84f9-ad1090e2b005'
  //     const XIBMClientSecret ='nH5sD1oR5dX6cC3vV1kY1xS1oB1eP3sM7hB5lR3xX5yV8oK7lG'


   Jazzcash.credentials({
      config:{
        merchantId:"MC56160",
        password:"u25y384sh5",
        hashKey:"s4tbdttvc1",
      },
          environment:'sandbox',


   });
      
   Jazzcash.setData({
    // pp_Amount: 100,
    // pp_TxnType: "MWALLET",
    // pp_Language: "EN",
    // pp_MerchantID: "MC56193",
    // pp_Password: "404sy0txt4",
    // pp_TxnRefNo: "T20230427091445",
    // pp_TxnCurrency: "PKR",
    // pp_TxnDateTime: "20230427085558",
    // pp_BillReference: "billref",
    // pp_MobileNumber: '03338708916',
    // pp_Description: "Description of transaction",
    // pp_TxnExpiryDateTime: "20230427085558",
    // pp_ReturnURL: "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction",
    // pp_SecureHash: "",
    // pp_BillReference: "billRef123",
    // pp_Description: "Test Payment",
    // pp_Version: "1.1",
    // pp_CNIC: "3460383305361",

    pp_Amount: 1 * 100,
    pp_TxnType: "MWALLET",
    pp_Version: "1.0",
    pp_BillReference: "billRef123",
    pp_Description: "Test Payment",
    pp_MobileNumber: "03338708916",
    pp_CNIC: "346038",
    pp_TxnExpiryDateTime: "20230427085558",
   
   })

    // console.log(Jazzcash.data)
      Jazzcash.createRequest("PAY").then((res)=>{
             res = JSON.parse(res)
          console.log(res)
      });
    //   axios.post('https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction',data,{requestOptions})
    //  .then((response)=>{
    //   console.log(response)
    //  })
    //     .catch(error=>{
    //       console.log(error)
    //     })
      
      
      
}
// if((response)=>{
//   const token = response.data.access_token;
//   console.log(token)
// })

 // const client = new easypaisa({
      //    'ClientId' : 'f8d8c338-ee8e-4fe5-84f9-ad1090e2b005',
      //   'ClientSecret':'nH5sD1oR5dX6cC3vV1kY1xS1oB1eP3sM7hB5lR3xX5yV8oK7lG',
      //   'X-Channel':'WEB',
      //   'content-type': 'application/json',
      //    accept: 'application/json',
      //    environment:"sandbox",
      //    'Autorization':`Basic ${Buffer.from(`${ClientId}:${ClientSecret}`).toString('base64')}`
      //   })

    
      // const data=({
      //   amount: '10.00',
      //   sender_mobileNumber: '+923338708916',
      //   receiver_mobileNUmber:"+923352777765",
      //   transactionRef: '1234567890',
      //   expiryInMinutes: '30',
      //   transferDescription: 'Payment for services',
        
       
      // })
      
     
      
      // axios.post('https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/CashDeposit/CashDeposit', data, client )
      //   .then(response => {
      //        const token = response.data.access_token;
   
      //     // console.log(token);
      //   })
