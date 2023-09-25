const models = require("../models");
var bcrypt = require("bcryptjs");
module.exports = class UserController {
  //done
  async findUser(req, res) {
    try {
      const id = parseInt(Object.values(req.params));
      const data = await models.User.findOne({ where: { id: id } });

      if (!data) {
        return res.status(404).json({ errMsg: "User not found" });
      }

      const result = {
        status: "ok",
        data: data,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  //done
  async registerUser(req, res, next) {
    try {
      const { name, username, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8); 
      const registeredUser = await models.User.findOne({ where: { username: username } });
      if (!username || !password) {
        return res.status(400).json({errMsg: 'Username and Password required'});
      } else if (registeredUser !== null) {
        res.status(409).json({errMsg:'Username already taken!'})
      } else {
        await models.User.create({ name, username, email, password: hashedPassword })
          .then(user => {
            console.log('user created: ' + username)
            res.status(201).json({id: user.id})
          })
          .catch(err => next(err))
      }
    } catch (error) {
      console.log(error);
    }
  }

  //done
  async editUser(req, res) {
    try {
      const { id } = req.params;
      
      if(!id){
        res.status(400).json({errMsg: 'ID is empty'});
      }
      
      const data = await models.User.findOne({
        where: {
          id: id
        }
      });

      if(!data){
        res.status(404).json({errMsg: 'User not found'});
      }

      data.email = req.body.email;
      data.username = req.body.username;
      data.total_score = req.body.total_score;
      data.bio = req.body.bio;
      data.city = req.body.city;
      data.social_media_url = req.body.social_media_url;

      await data.save();
      res.status(204).json(req.body);

    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      

      if(!id || !password){
        res.status(400).json({errMsg: 'ID or password is empty'});
      }

      const data = await models.User.findOne({
        where: {
          id: id
        }
      });

      if(!data){
        res.status(404).json({errMsg: 'User not found'});
      }

      const hashedPassword = bcrypt.hashSync(rpassword, 8); 
      data.password = hashedPassword;
      await data.save();
      res.status(204);

    } catch (error) {
      console.log(error);
    }
  }

  async addPoint(req, res) {
    try {
      const { id } = req.params;
      const data = await models.User.findOne({
        where: {
          id: id
        }
      });

      if(!data){
        res.status(404).json({errMsg: 'User not found'});
      }

      data.total_score += 1;

      await data.save();

    } catch (error) {
      console.log(error);
    }
  }

  async showScore(req, res) {
    try {
      const { id } = (req.params);
      const user = await models.User.findOne({ where: { id: id } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user.total_score);
    } catch (error) {
      console.log(error);
    }
  }
};
