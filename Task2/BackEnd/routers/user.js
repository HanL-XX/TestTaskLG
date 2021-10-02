const express = require('express');
const dotenv = require("dotenv")
const { searchUser, editUser} = require('../controller/user.js');

dotenv.config({ path: "../config.env" })

const router = express.Router();

router.get('/', searchUser);
router.post('/', editUser);

module.exports = router;