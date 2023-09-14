const models = require("../models");

module.exports = class GameController {
  async index(req, res) {
    try {
      const games = await models.Game.findAll();
      if (!games) {
        return res.status(404).json({ error: "Game not found" });
      }
      return res.status(200).json(games);
    } catch (error) {
      console.log(error);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const game = await models.Game.findOne({ where: { id: id } });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(game);
  }

  async showPlayCount(req,res){
    try{
      const { id } = (req.params);
      const game = await models.Game.findOne({ where: { id: id } });

      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }

      res.json(game.play_count);
    } catch (error) {
          console.log(error);
    }  
  }

  async showDescription(req,res){
    const { id } = req.params;
    const game = await models.Game.findOne({ where: { id: id } });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(game.description);
  }

};
