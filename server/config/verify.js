const jwt = require("jsonwebtoken");
exports.verification = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({ Error: "Verification Failed in token" });
      req.body.email = decode.email;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Verification Failed",
      error,
    });
  }
};
