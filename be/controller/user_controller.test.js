const models = require("../models");
const UserController = require("./user_controller");
const bcrypt = require("bcryptjs")

describe("UserController", () => {
  let findOneMock;
  let createMock;
  let jsonMock;
  let userController;
  

  beforeEach(() => {
    // Mock the necessary dependencies
    findOneMock = jest.spyOn(models.User, "findOne").mockResolvedValue(null);
    createMock = jest.spyOn(models.User, "create").mockResolvedValue({id: 1});
    hashSyncMock = jest.spyOn(bcrypt, "hashSync").mockReturnValue("hashedPassword");
    jsonMock = jest.fn();
    
    userController = new UserController();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("findUser method", () => {
    it("should return status 404 if user is not found", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.findUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ errMsg: "User not found" });
    });

    it("should return status 200 with the user data if user is found", async () => {
      const user = { id: 1, name: "Test" };
      findOneMock.mockResolvedValueOnce(user);
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.findUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({status:"ok", data: user});
    });
  });

  describe("registerUser method", () => {
    it("should return status 400 if user empty", async () => {
      const req = { body: { username: "", password: "password" } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.registerUser(req, res);

      expect(findOneMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({errMsg: 'Username and Password required'});
    });

    it("should return status 409 if username already exist", async () => {
      const user = { id: 1, name: "Test user", username: "testuser", password: "password" };
      findOneMock.mockResolvedValueOnce(user);
      const req = { body: { username: "testuser", password: "password" } };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.registerUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { username: req.body.username } });
      expect(res.status).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({errMsg:'Username already taken!'});
    });

    it("should return status 201 if user created", async () => {
        const req = { body: { username: "testuser", password: "password" } };
        const res = { status: jest.fn().mockReturnThis(), json: jsonMock };
  
        await userController.registerUser(req, res);
        expect(createMock).toHaveBeenCalled();
        expect(findOneMock).toHaveBeenCalledWith({ where: { username: req.body.username } });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith({id: 1});
      });
  });

  describe("editUser method", () => {
    it("should return status 400 if id empty", async () => {
      const req = { params: { id : "" }};
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.editUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({errMsg: 'ID is empty'});
    });

    it("should return status 404 if user not found", async () => {
      const req = { params: { id : 1 }};
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.editUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id }});
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({errMsg: 'User not found'});
    });

    it("should return status 204 if data already updated", async () => {
      const req = { 
        params: { id : 1 }, 
        body: { 
          email: "test@example.com", 
          username: "testuser",
          total_score: 99,
          bio: "lorem ipsum",
          city: "Paris",
          social_media_url: "http://example.com/testuser"
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      const user = { id: 1, save: jest.fn() };
      findOneMock.mockResolvedValueOnce(user);

      await userController.editUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id }});
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
      expect(jsonMock).toHaveBeenCalledWith(req.body);
    });
  });

  describe("resetPassword method", () => {
    it("should return status 400 if id or password empty", async () => {
      const req = { params: { id : "" }, body: { password: '' }};
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({errMsg: 'ID or password is empty'});
    });

    it("should return status 404 if user not found", async () => {
      const req = { params: { id : 1 }};
      const res = { status: jest.fn().mockReturnThis(), json: jsonMock };

      await userController.editUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id }});
      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({errMsg: 'User not found'});
    });

    it("should return status 204 if data already updated", async () => {
      const req = { 
        params: { id : 1 }, 
        body: { password: "password" }
      };
      const res = { status: jest.fn().mockReturnThis() };

      const user = { id: 1, save: jest.fn() };
      findOneMock.mockResolvedValueOnce(user);

      await userController.editUser(req, res);

      expect(findOneMock).toHaveBeenCalledWith({ where: { id: req.params.id }});
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
});
