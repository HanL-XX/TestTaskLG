const express = require('express');
const dotenv = require("dotenv")
const { postUser,searchUser} = require('../controller/user.js');
const auth = require("../middleware/auth")

dotenv.config({ path: "../config.env" })

const router = express.Router();

router.get('/',auth, searchUser);
router.post('/',auth, postUser);

module.exports = router;