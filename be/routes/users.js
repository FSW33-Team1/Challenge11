const express = require("express");
const controller = require("../controller/user_controller");
const UserController = new controller();
const router = express.Router();

const { authJwt } = require("../middleware");

/* GET users listing. */
router.get("/:id", [authJwt.verifyToken], UserController.findUser);

//edit player data
router.put("/:id", [authJwt.verifyToken], UserController.editUser);

//show total points
router.get('/:id/total-score', [authJwt.verifyToken], UserController.showScore);

//add points
router.put('/:id/add-point', UserController.addPoint);

//reset password
router.put('/:id/reset-password', [authJwt.verifyToken], UserController.resetPassword);


module.exports = router;