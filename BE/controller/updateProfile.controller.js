const update = require('../models/udpateProfile.model')

exports.updatePro = async(req,res)=>{
const {instituteName}= req.body;
// const Updater = await update.find({});
const updater = new update({
    instituteName : req.body.instituteName,
});

updater.save().then((result)=>{
    if(result){
        res.json({message:"success"})
    }
});
}