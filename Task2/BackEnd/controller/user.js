const StatusCode = require("../common/StatusCode.js");
const User = require("../models/user.js");
const { ObjectId } = require("mongodb");
const validator = require("email-validator");
const moment  = require("moment");

//Tìm kiếm người dùng (tên hoặc email)
const searchUser = async (req, res) => {
  if (!req.access) {
    return;
  }

  const { search } = req.query;

  if (!search) {
    const outSearch = await User.find({})
      .sort({ registration_data: -1 })
      .catch((err) => {
        return res
          .status(StatusCode.PayloadIsInvalid)
          .json({ msg: "Dont search" });
      });
    return res
      .status(StatusCode.SuccessStatus)
      .json({ msg: "Search all complete", outSearch });
  } else {
    const outSearch = await User.find({
      $or: [
        { email: new RegExp(search, "i") },
        { username: new RegExp(search, "i") },
      ],
    })
      .sort({ registration_data: -1 })
      .catch((err) => {
        return res
          .status(StatusCode.PayloadIsInvalid)
          .json({ msg: "Dont search" });
      });
    return res
      .status(StatusCode.SuccessStatus)
      .json({ msg: "Search complete", outSearch });
  }
};

//post nhiều user
const postUser = async (req, res) => {
  if (!req.access) {
    return;
  }

  const arrayUser = req.body.user;
  let log = [];

  //IF USE PROMISEALL WILL FASTER

  for (let i of arrayUser) {
    const { _id, username, birthday, email } = i;

    const birthdayUTC = moment(birthday).format().toString();
    //Kiểm tra email
    if (!validator.validate(email)) {
      log.push({ _id, username, birthday, email });
      continue;
    }
    //Kiểm tra tên EL
    if (!/^[a-z ,.'-]+$/i.test(username)) {
      log.push({ _id, username, birthday, email });
      continue;
    }
    //Kiểm tra ngày tháng năm sinh UTC
    if (!/\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))/.test(birthdayUTC)) {
      log.push({ _id, username, birthday, email });
      continue;
    }

    if (_id === undefined) {
      //ADD USER
      await User.findOne({ email })
        .then(async (user) => {
          if (user) {
            throw log;
          }
          const newUser = new User({
            username:username,
            birthday: birthdayUTC,
            email:email,
          });
          await newUser.save();
        })
        .catch((err) => {
          log.push({ _id, username, birthday, email });
        });
    } else {
      //UPDATE USER
      let Oid = ObjectId(_id);
      await User.findOne({ _id: Oid })
        .then(async (user) => {
          if (!user) {
            throw log;
          }
          await User.updateOne(
            { _id: Oid },
            {
              $set: {
                username: username,
                email: email,
                birthday: birthdayUTC,
              },
            }
          );
        })
        .catch((err) => {
          log.push({ _id, username, birthday, email });
        });
    }
  }
  return res.status(StatusCode.SuccessStatus).json({ msg: "User throw ", log });
};

module.exports = {
  postUser,
  searchUser,
};
