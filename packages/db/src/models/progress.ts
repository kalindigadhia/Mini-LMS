
import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    userId:{
        type:String,
         required:true,
    },
    lessonId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lesson",
         required:true,
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export const Progress = mongoose.models.Progress || mongoose.model("Progress",ProgressSchema)