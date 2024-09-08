const User = require('../models/userModel'); // Corrected "user" to "User" to match the model name
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ErrorResponse("E-mail already registered", 400));
    }

    const user = await User.create(req.body); // Added "await" to ensure the user is created before continuing
    res.status(201).json({
      success: true,
      data: user, // Optionally return the created user or a message
    });

  } catch (error) {
    next(error); // Pass any error to the error-handling middleware
  }
};

exports.signin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const { email,password } = req.body;
   //validation
    if (!email) {
      return next(new ErrorResponse("please add email", 400));
    }
    if (!password) {
      return next(new ErrorResponse("please add password", 400));
    }
//check email
   
const user = await User.findOne({ email });
if (!user) {
  return next(new ErrorResponse("invalid credentials", 400));
}
const isMatched = user.comparePassword(password);
if (!isMatched) {
  return next(new ErrorResponse("invalid password", 400));
}

sendTokenRessponse(user,200,res);

  } catch (error) {
    next(error); // Pass any error to the error-handling middleware
  }
};
const sendTokenRessponse = async (user,codestatus,res)=> {
 const token = await user.getjwtToken ();
 res
 .status(codestatus)
 .cookie('token',token,{maxAge:60 * 60 * 1000,httpOnly:true})
 .json({success:true,
  role: user.role
})

}
//logout 


exports.logout = (req,res,next) =>{

res.clearCokie('token');
res.status(200).json({
   success:true,
   message:"logged out "


})

}
exports.userProfile = async(req,res,next) =>{

 const user = await user.findById(req.user.id).select('password') ;
  res.status(200).json({
     success:true,
     user
  
  
  })
}