import mongoose,{Schema} from "mongoose"

const attemptSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    assessmentId:{
        type: Schema.Types.ObjectId,
        ref:"Assessment"
    },

    selectedAnswer:String,
    passed:Boolean

},{
    timestamps:true
})

export const Attempt = mongoose.models.Attempt ||
mongoose.model("Attempt", attemptSchema)