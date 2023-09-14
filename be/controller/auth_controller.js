const config = require("../config/auth.config");
const models = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  try {
    models.User.findOne({ where: { email: req.body.email } }).then(user => {
      if (!user) {
        console.log('data not found')
        return res.status(404).json({ error: "User not found" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        accessToken: token
      });
    });



  } catch (error) {
    console.log(error)
  };
};
