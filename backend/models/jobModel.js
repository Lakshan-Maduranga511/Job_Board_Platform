const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
// Corrected the typo in "mongoose.Schema" and updated "userSchema" to "UserSchema"
const jobSchema = new mongoose.Schema(
  {
     title: {
      type: String,
      trim: true,
      required: [true, 'title is required'], // Corrected the required syntax
      maxlength: 70,
    },
    sescription: {
        type: String,
        trim: true,
        required: [true, 'description is required'], // Corrected the required syntax
        
      },
      sallary: {
        type: String,
        trim: true,
        required: [true, 'Sallary is required'], // Corrected the required syntax
        
      },
      location: {
        type: String
        
      },
      available: {
        type: Boolean,
        default:true
        
      },
      jobType : {
        type: ObjectId,
        
        ref:"user",
        required:true
      },
      user: {
        type: ObjectId,
        
        ref:"user",
        required:true
      },
  
  },
  { timestamps: true } // Corrected the typo from "timestamp" to "timestamps"
);module.exports = mongoose.model("job", jobSchema);