const express = require("express");
const controller = require("../controller/game_controller");
const GameController = new controller();
const router = express.Router();
const { authJwt } = require("../middleware");

//get all games
router.get("/", GameController.index);

//show one game
router.get("/:id", GameController.show);

//show playcount
router.get('/:id/play-count', GameController.showPlayCount);

//show description
router.get('/:id/description', GameController.showDescription);

module.exports = router;
