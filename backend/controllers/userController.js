const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto")

// Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl"
        }
    })
    sendToken(user,201,res);
})

// Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    // Checking if user has given both email and password
    if (!email || !password){
        return next(new ErrorHandler("Please provide both email and Password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if (!user){
        return next(new ErrorHandler("User not found Invalid Email or Password"),401)
    }

    console.log(password)
    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched)
    if (!isPasswordMatched){
        return next(new ErrorHandler("User not found Invalid Email or Password"),401)
    }
    
    sendToken(user,200,res);
})


// Logout 
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message:"Logged Out"
    })
    next()
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`


    const message = `Yout password reset token is : \n\n ${resetPasswordUrl}, If you have not requested this email then please ignore it.`;

    try{
        
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });
        
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} succesfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message,500))
    }
})

// Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if(!user){
        return next(new ErrorHandler("Reset Password  Token is invalid or has been expired.",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match ",400))
    }

    user.password = req.body.password;
    
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    console.log("oho guru chal raa h")

    sendToken(user,200,res)
})


// Get user Detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

// Update user Detail
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect"),400)
    }

    if (req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password and confirm password dosenot match"),400)
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user,200,res)

})
// Update user Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }
    console.log(req.user._id)
    console.log(newUserData)
    // We will add cloudinary pics later

    const user = await User.findByIdAndUpdate(req.user._id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
        user
    })
})

// Get all Users(admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    
    res.status(200).json({
        success:true,
        users,
    })
})

// Get single User for (admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not exist with Id:${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        user,
    })
})

// Update user Role --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    console.log(req.params.id)
    console.log(newUserData)
    // We will add cloudinary pics later

    const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
        user
    })
})

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User not exist with Id:${req.params.id}`,404))
    }

    await user.remove()

    res.status(200).json({
        success:true,
        message:"user Deleted succesfully"
    })
})

