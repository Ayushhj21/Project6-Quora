
const questionModel = require('../models/questionModel');
const answerModel = require('../models/answerModel');
const userModel = require('../models/userModel');
const validateBody = require('../validators/validator');


const createQuestion = async (req, res) => {
    try {
        const requestBody = req.body
        const userId = req.body.askedBy
        const tokenId = req.userId
        if (!validateBody.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        const { description, tag, askedBy } = requestBody
        if (!validateBody.isValid(description)) {
            return res.status(400).send({ status: false, message: "Please provide description or description field" });
        }
        if (!validateBody.isValid(tag)) {
            return res.status(400).send({ status: false, message: "Please provide tag or tag field" });
        }
        if (!validateBody.isValid(askedBy)) {
            return res.status(400).send({ status: false, message: "Please provide askedBy or askedBy field" });
        }
        if (!(validateBody.isValidObjectId(askedBy))) {
            return res.status(400).send({ status: false, message: "Not a valid userId" });;
        }

        if (!(userId.toString() == tokenId.toString())) {
            return res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
        }
        const user = await userModel.findById(askedBy)
        if (!user) {
            return res.status(400).send({ status: false, message: "user not found with this userId" })
        }
        requestBody.tag = tag.split(",")
        console.log(tag)
        const createQuestion = await questionModel.create(requestBody)
        return res.status(201).send({ status: true, message: "Question created Successfully", data: createQuestion })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const getQuestions = async (req, res) => {
    try {
        let filterQuery = req.query;
        let { tag, sort } = filterQuery;

        let query = { isDeleted: false }
        if (validateBody.isValid(tag)) {
            const tagArr = tag.split(',')
            query['tag'] = { $all: tagArr }
        }
        //The $all operator selects the documents where the value of a field is an 
        //array that contains all the specified elements.
        if (sort) {
            if (sort == "ascending") {
                var data = await questionModel.find(query).sort({ createdAt: 1 })
            }
            if (sort == "descending") {
                var data = await questionModel.find(query).sort({ createdAt: -1 })
            }
        }
        if (!sort) {
            var data = await questionModel.find(query)
        }
        for (let i = 0; i < data.length; i++) {
            let answer = await answerModel.find({ questionId: data[i]._id }).select({ text: 1, answeredBy: 1})
            data[i].answers = answer
            //console.log(answer)
        }
        return res.status(200).send({ status: true, Details: data });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getQuestionById = async (req, res) => {
    try {
        const questionId = req.params.questionId
        if (!(validateBody.isValidObjectId(questionId))) {
            return res.status(400).send({ status: false, message: `${questionId} is not a valid id` });
        }
        const question = await questionModel.findOne({ _id: questionId, isDeleted: false })
        if (!question) {
            return res.status(404).send({ status: false, msg: "question does not exist" })
        }
        let answer = await answerModel.find({ questionId: questionId })
        const data = question.toObject()
        data['answer'] = answer
        return res.status(200).send({ status: true, msg: "Successfully found data", data: data })


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}





// const questions = await questionModel.find(query).sort({})

// console.log(questions)
// if (!questions) {
//     return res.status(404).send({ status: false, message: 'No data found' })
// }


// const id = (questions._id)
// console.log(id)
// const answers = await answerModel.find({ questionId: id })
// if ((Object.keys(answers).length > 0)) {
//     const getQuestions = {
//         description,
//         tag,
//         askedBy,
//         answers: answers
//     }
//     return res.status(200).send({ status: true, message: "Questions data found successfully", data: getQuestions });
// }
// // return res.status(200).send({ status: true, message: `${countQuestions} Questions Found`, data: questions });
// if (!(Object.keys(answers).length > 0)) {
//     const getQuestions = {
//         description,
//         tag,
//         askedBy,
//         answers: "No answers given"
//     }
//     return res.status(200).send({ status: true, message: "Questions data found successfully", data: questions });
// }

//     } catch (err) {
//     console.log(err)
//     res.status(500).send({ status: false, msg: err.message })
// }




// let getquestion = await questionModel.find()
// const countquestion = getquestion.length
// if (!(countquestion > 0)) {
//     return res.status(404).send({ status: false, msg: "No question found" })
// }
// return res.status(200).send({ status: true, message: `${countquestion} Questions Found`, data: getquestion });








module.exports.createQuestion = createQuestion
module.exports.getQuestions = getQuestions
module.exports.getQuestionById = getQuestionById
