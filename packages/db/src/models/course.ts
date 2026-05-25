import mongoose from "mongoose"
const CourseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    createdBy:{
        type:String,
        required:true,
    },
    price:{
        type:String,
    }
},{
    timestamps:true
})
 const Course = mongoose.models.Course || mongoose.model("Course",CourseSchema)

 export default Course