const { request } = require('express');
const questionModel = require('../models/questionModel');
const userModel = require('../models/userModel');
const validateBody = require('../validators/validator');


const createQuestion= async(req,res)=>{   
    try{
        const requestBody=req.body
        const userId=req.body.askedBy
        const tokenId = req.userId
        if (!validateBody.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        const{description,tag,askedBy}=requestBody
        if (!validateBody.isValid(description)) {
            return res.status(400).send({ status: false, message: "Please provide description or description field" });
        }
        if(!validateBody.isValid(tag)){
            return res.status(400).send({ status: false, message: "Please provide tag or tag field" });
        }
        if(!validateBody.isValid(askedBy)){
            return res.status(400).send({ status: false, message: "Please provide askedBy or askedBy field" });
        }
        if (!(validateBody.isValidObjectId(askedBy))) {
            return res.status(400).send({ status: false, message: "Not a valid userId" });;
        }

        if (!(userId.toString() == tokenId.toString())) {
            return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
        }
        const user=await userModel.findById(askedBy)
        if(!user){
            return res.status(400).send({status:false,message:"user not found with this userId"})
        }
        requestBody.tag=tag.split(",")
        console.log(tag)
        const createQuestion=await questionModel.create(requestBody)
        return res.status(201).send({status:true,message:"Question created Successfully",data:createQuestion})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const getQuestions= async (req,res)=>{
    try{

    }
}


module.exports.createQuestion=createQuestion

