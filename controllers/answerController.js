const answerModel = require("../models/answerModel");
const userModel = require("../models/userModel");
const questionModel = require("../models/questionModel")
const mongoose = require("mongoose")
const validateBody = require('../validators/validator');



const createAnswer = async (req, res) => {
    try {
        let requestBody = req.body;
        const userId = req.body.answeredBy
        const tokenId = req.userId

        if (!validateBody.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters' });

        }

        if (!(validateBody.isValidObjectId(userId) && validateBody.isValidObjectId(tokenId))) {
            return res.status(400).send({ status: false, message: "Not a valid userId or tokenId" });;
        }


        if (!(userId.toString() == tokenId.toString())) {
            return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
        }

        let { answeredBy, text, questionId } = requestBody;

        if (!validateBody.isValidObjectId(answeredBy)) {
            return res.status(400).send({ status: false, message: `${answeredBy} is not a valid User id` })
        }

        const user = await userModel.findById({ _id: answeredBy })
        if (!user) {
            return res.status(404).send({ status: false, message: `User Details not found with given userId` })
        }

        if (!validateBody.isValid(text)) {
            return res.status(400).send({ status: false, message: `text is required` })
        }
        if (!validateBody.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid Question id` })
        }

        const question = await questionModel.findOne({ _id: questionId, isDeleted: false })
        if (!question) {
            return res.status(404).send({ status: false, message: `Question Details not found with given questionid` })
        }

       
        let answer= await answerModel.create(requestBody);
        return res.status(201).send({ status: true, data: answer })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.createAnswer=createAnswer