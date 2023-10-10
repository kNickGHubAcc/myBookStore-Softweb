const express = require("express");
const register = require('../controllers/register');
const login = require('../controllers/login');

const router = express.Router();


router.post("/api/register", register);
router.post("/api/login", login);


module.exports = router;