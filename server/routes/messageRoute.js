const express = require('express');
const router = express.Router();
const Examinee = require ('../models/Examinee');
const Message = require('../models/Message')
router.post('/', async(req,res)=>{
    const{question,email} = req.body;
    const user = await Examinee.findOne({email:email});
    const id = user._id;
    const contact = await new Message({question:question,examineeId:id});
    contact.save();
    res.json({message:"Message sended Successfully"})
})

router.get('/:id', async(req,res)=>{
    const Id = req.params;
    const msg= await Message.find({examineeId:Id.id}).populate('examineeId');
    return res.json({message:msg});
})
module.exports = router