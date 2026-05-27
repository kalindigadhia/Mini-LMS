import mongoose,{Schema} from "mongoose"

const assessmentSchema = new Schema({
    lessonId:{
        type:Schema.Types.ObjectId,
        ref:"Lesson"
    },
    question:{
        type:String
    },
    options:[String],

    correctAnswer:{
        type:String
    }

},{
    timestamps:true
})

export const Assessment = mongoose.models.Assessment || mongoose.model( "Assessment",assessmentSchema )