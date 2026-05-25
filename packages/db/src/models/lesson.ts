import mongoose from "mongoose";
const lessonSchema = new mongoose.Schema({
    courseId:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Course",
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
},{
    timestamps:true
})
export const Lesson = mongoose.models.Lesson || mongoose.model("Lesson",lessonSchema)