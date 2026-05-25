import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    courseId:{
        type:String,
        required:true
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Course"
    },
},{
    timestamps:true
})
EnrollmentSchema.index(
  {
    userId: 1,
    courseId: 1
  },
  {
    unique: true
  }
)

 const Enrollment =mongoose.models.Enrollment || mongoose.model("Enrollment",EnrollmentSchema)

 export default Enrollment