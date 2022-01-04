const mongoose = require("mongoose");


const answerSchema = new mongoose.Schema({

    answeredBy: 
         { type: mongoose.Schema.Types.ObjectId, ref: 'userModel',required: true },
     text: {type:String, default: true},

    questionId:{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel',required: true },

}
, { timestamps: true })
module.exports = mongoose.model('answerModel', answerSchema)