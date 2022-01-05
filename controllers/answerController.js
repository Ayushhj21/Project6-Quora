const answerModel = require("../models/answerModel");
const userModel = require("../models/userModel");
const questionModel = require("../models/questionModel")
const mongoose = require("mongoose")
const validateBody = require('../validators/validator');



const createAnswer = async (req, res) => {
    try {
        let requestbody = req.body;
        const userId = req.body.answeredBy
        let TokenDetail = req.userId

        if (!validateBody.isValidRequestBody(requestbody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters' });
            return
        }

        if (!(TokenDetail == requestbody.answeredBy)) {
            res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
        }

        let { answeredBy, text, questionId } = requestbody;

        if (!validateBody.isValidObjectId(answeredBy)) {
            return res.status(400).send({ status: false, message: `${answeredBy} is not a valid User id` })
        }

        const UserFound = await userModel.findById({ _id: answeredBy })
        if (!UserFound) {
            return res.status(404).send({ status: false, message: `User Details not found with given userId` })
        }

        if (!validateBody.isValid(text)) {
            res.status(400).send({ status: false, message: `text is required` })
            return
        }
        if (!validateBody.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid Question id` })
        }

        const QuestionFound = await questionModel.findOne({ _id: questionId, isDeleted: false })
        if (!QuestionFound) {
            return res.status(404).send({ status: false, message: `Question Details not found with given questionid` })
        }

        let data = { answeredBy, text, questionId };
        let createAns = await answerModel.create(data);
        return res.status(201).send({ status: true, data: createAns })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.createAnswer=createAnswer