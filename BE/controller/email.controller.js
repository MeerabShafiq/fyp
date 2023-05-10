const nodemailer = require('nodemailer');

exports.sendEMail = async(req,res)=>{
  const {to , subject , text, Time}= req.body;
    let transporter = nodemailer.createTransport({
       service:'gmail',
        auth: {
          user: 'root2hack@gmail.com', // generated ethereal user
          pass: 'vpvroksxjuvnlalb', // generated ethereal password
        },
      });
       await transporter.sendMail({
        from: 'root2hack@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        Time:Time,
        
      }).then((response)=>{
       res.status(200).json({message:response})
      }).catch((err)=>{
        return res.status(404).json({message:{err}})
      })
      
        
      
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal accoun
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }


