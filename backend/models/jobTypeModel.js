const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
// Corrected the typo in "mongoose.Schema" and updated "userSchema" to "UserSchema"
const jobTypeSchema = new mongoose.Schema(
  {
     jobTypeName: {
      type: String,
      trim: true,
      required: [true, 'job category  is required'], // Corrected the required syntax
      maxlength: 70,
    }, 
   
      user: {
        type: ObjectId,
        ref:"user",
        required:true
      },
  
  },
  { timestamps: true } // Corrected the typo from "timestamp" to "timestamps"
);module.exports = mongoose.model("jobType", jobTypeSchema);