const express = require("express");
const { Register, Login } = require("../controller/auth");
// const { verification } = require("../config/verify");
const router = express.Router();

router.post("/signup", Register);
router.post("/login", Login);

// router.get("/current-user", verification, currentCustomer);

module.exports = router;
