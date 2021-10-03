const StatusCode = require("../common/StatusCode.js");
const User = require("../models/user.js");
const { ObjectId } = require("mongodb");
const validator = require("email-validator");

//Tìm kiếm người dùng (tên hoặc email)
const searchUser = async (req, res) => {
  if (!req.access) {
    return;
  }

  const { search } = req.query;

  if (!search) {
    return res.status(StatusCode.PayloadIsInvalid).json({ msg: "Dont search" });
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
    const { id, username, birthday, email } = i;
    //Kiểm tra email
    if (!validator.validate(email)) {
      log.push({ id, username, birthday, email });
      continue;
    }
    //Kiểm tra tên EL
    if (!/^[a-z ,.'-]+$/i.test(username)) {
      log.push({ id, username, birthday, email });
      continue;
    }
    //Kiểm tra ngày tháng năm sinh
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(birthday)) {
      log.push({ id, username, birthday, email });
      continue;
    }

    if (id === undefined) {
      //ADD USER
      await User.findOne({ email })
        .then(async (user) => {
          if (user) {
            throw log;
          }
          const newUser = new User({
            username,
            birthday,
            email,
          });
          await newUser.save();
        })
        .catch((err) => {
          log.push({ id, username, birthday, email });
        });
    } else {
      //UPDATE USER
      let Oid = ObjectId(id);
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
                birthday: birthday,
              },
            }
          );
        })
        .catch((err) => {
          log.push({ id, username, birthday, email });
        });
    }
  }
  return res.status(StatusCode.SuccessStatus).json({ msg: "User throw ", log });
};

module.exports = {
  postUser,
  searchUser,
};
