const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

//Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token = req.header("x-auth-token");

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  //  else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  //make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not Authorized to access this route", 401));
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = decoded

    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized to access this route", 401));
  }
});

exports.authorize = (...roles) => {
 
  return (req, res, next) => {
    console.log(req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User role ${req.user.role} is not authorized`, 403)
      );
    }
    next();
  };
};