const countAllquestion = getAllQuestion.length
            if (!(countAllquestion > 0)) {
                return res.status(404).send({ status: false, msg: "No question found" })
            }
            let quesAns = []
            for (let i = 0; i < getAllQuestion.length; i++) {
                quesAns.push(getAllQuestion[i].toObject())
            }
            let answer = await answerModel.find()
            for (Ques of quesAns) {
                for (Ans of answer) {
                    if ((Ques._id).toString() == (Ans.questionId).toString()) {
                        Ques['answers'] = Ans
                    }
                }
            }
            return res.status(200).send({ status: true, message: `${countquestion} Successfully Question Answer Found`, data:quesAns});
        }
        let getquestion = await questionModel.find()
        const countquestion = getquestion.length
        if (!(countquestion > 0)) {
            return res.status(404).send({ status: false, msg: "No question found" })
        }
        return res.status(200).send({ status: true, msg: `${countquestion} Successfully found data`, data: getquestion })