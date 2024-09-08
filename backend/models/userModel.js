const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {ObjectId} = mongoose.Schema;
const jobHistorySchema = new mongoose.Schema(
  {
     title: {
      type: String,
      trim: true,
      // Corrected the required syntax
      maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
       // Corrected the required syntax
        
      },
      sallary: {
        type: String,
        trim: true,
         // Corrected the required syntax
        
      },
      location: {
        type: String
        
      },
      interviewDate: {
        type: Date
        
      },
      applicationStatus: {
        type: String,
        enum:['pending','accepted','rejected'],
        default:'pending'
        
      },
     
      user: {
        type: ObjectId,
        
        ref:"user",
        required:true
      },
  
  },{ timestamps: true })
// Corrected the typo in "mongoose.Schema" and updated "userSchema" to "UserSchema"
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required'], // Corrected the required syntax
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'], // Corrected the required syntax
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'], // Corrected the required syntax
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required'], // Corrected the required syntax
      maxlength: 10,  // Note: Consider increasing the maximum length for a real-world application
    },
    jobsHistory : [jobHistorySchema ],

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // Corrected the typo from "timestamp" to "timestamps"
);

// Encrypt password before saving the user document
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { // Corrected the condition to check if the password is modified
    return next();
  }
  
  this.password = await bcrypt.hash(this.password, 10); // Fixed typo "bycript" to "bcrypt"
  next(); // Call the next middleware or save function
});



UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

//return  a jwt token 

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({id:this.id}.process.env.JWT_SECRET,{

    expiresIn:3600
  }
  );

}
module.exports = mongoose.model("User", UserSchema); // Changed the model name to "User" (capitalized) for convention
