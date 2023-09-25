const models = require("../models");
const GameController = require("./game_controller");

describe("GameController", () => {
  let findAllMock;
  let findOneMock;
  let sendMock;
  let jsonMock;
  let gameController;

  beforeEach(() => {
    // Mock the necessary dependencies
    findAllMock = jest.spyOn(models.Game, "findAll").mockResolvedValue(null);
    findOneMock = jest.spyOn(models.Game, "findOne").mockResolvedValue(null);
    sendMock = jest.fn();
    jsonMock = jest.fn();
    
    gameController = new GameController();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("index method", () => {
    it("should return status 404 with if no games found", async () => {

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.index(req, res);

      findAllMock.mockResolvedValueOnce(null);

      expect(findAllMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Game not found" });
    });

    it("should return status 200 with games array if games found", async () => {
      const games = [{ id: 1, name: "Game 1" }, { id: 2, name: "Game 2" }];
      findAllMock.mockResolvedValueOnce(games);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.index(req, res);

      expect(findAllMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(games);
    });
  });

  describe("show method", () => {
    it("should return status 404 if game is not found", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.show(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Game not found" });
    });

    it("should return status 200 with the game object if game is found", async () => {
      const game = { id: 1, name: "Game 1" };
      findOneMock.mockResolvedValueOnce(game);
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.show(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(game);
    });
  });

  describe("showPlayCount method", () => {
    
    it("should return status 404 if game is not found", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.showPlayCount(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Game not found" });
    });

    it("should return the play count of the game if game is found", async () => {
      const game = { id: 1, name: "Game 1", play_count: 10 };
      findOneMock.mockResolvedValueOnce(game);
      const req = { params: { id: 1 } };
      const res = { json: jsonMock };

      await gameController.showPlayCount(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(jsonMock).toHaveBeenCalledWith(game.play_count);
    });
  });

  describe("showDescription method", () => {
    it("should return status 404 if game is not found", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.showDescription(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Game not found" });
    });

    it("should return the description of the game if game is found", async () => {
      const game = { id: 1, name: "Game 1", description: "This is a game" };
      findOneMock.mockResolvedValueOnce(game);
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await gameController.showDescription(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(game.description);
    });
  });
});
