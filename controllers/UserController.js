const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

// ------------ Create Record --------------------------------------
exports.createRecord = async (req, res, next) => {
    const {firstName,lastName,username, email,password} = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user_exists = await User.findOne({
      where: {
          [Op.or]: [{ email }, { username }]
      }
    });

    if (user_exists) {
        return res.status(400).json({ code: -1, message: 'User with provided email or username exists' });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword =  bcrypt.hashSync(password, salt);
  
    const newUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        });

    try {
        await newUser.save();
    } catch {
        err = "Error! Something went wrong while saving record."
        return next(err);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            process.env.APP_SECRET_TOKEN,
            { expiresIn: process.env.APP_EXPIRESIN }
        );
    } catch (err) {
        return next(new Error("Error! Something went wrong generating access token."));
    }

    res.status(201)
        .json({
            success: true,
            data: {
                userId: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                token: token
            },
        });
};

// ------------ Read Records --------------------------------------
exports.fetchRecords = async (req, res) => {
  // await User.create({ firstName: 'Jane', lastName: 'Doe', email: 'nik@web.com', password: 'pass123' })
  let data = await User.findAll();
  console.log(data);
  res.status(200).send({
    message: data,
  });
};

// ------------ Read Record --------------------------------------
exports.fetchRecord = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findByPk(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      code: -1,
      message: err.message || 'Error retrieving User with id=' + id,
    });
  }
  // await User.create({ firstName: 'Jane', lastName: 'Doe', email: 'nik@web.com', password: 'pass123' })
};

// ------------ Update Record --------------------------------------
exports.updateRecord = async (req, res) => {};

// ------------ Delete Record --------------------------------------
exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    let del_user = await User.destroy({
      where: {
        id: id,
      },
    });

    let message = ''(del_user == 1)
      ? (message = 'User was deleted successfully!')
      : (message = `Cannot delete User with id=${id}. Maybe User was not found!`);

    res.status(200).json({
      message,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err.message || 'Could not delete User with id=' + id,
    });
  }

}
  // ------------ Login User --------------------------------------
  exports.auth = async (req, res) => {
    let { email, password } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check email
    let user_exists = await User.findOne({ where: { email } });
    if (!user_exists)
      res
        .status(400)
        .json({ code: -1, message: 'User with provided email does not exist' });

    // check password
    const password_check = await bcrypt.compare(password, user_exists.password);
    if (!password_check)
      res
        .status(400)
        .json({
          code: -1,
          message:
            'Wrong Password/Email combination! please check your email or password and try again',
        });

    // jwt
    const token = jwt.sign(
      { userId: user_exists.id, email: user_exists.email },
      process.env.APP_SECRET_TOKEN,
      { expiresIn: process.env.APP_EXPIRESIN }
    );

    res.header('acess-token', token).status(200)
      .json({
        success: true,
        message: 'logged in',
        data: {
          userId: user_exists.id,
          email: user_exists.email,
          token: token,
        },
      });
  };

