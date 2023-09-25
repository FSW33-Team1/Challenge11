const { signin } = require("./auth_controller.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

describe("signin function", () => {
  let findOneMock;
  let compareSyncMock;
  let signMock;
  let sendMock;

  beforeEach(() => {
    // Mock the necessary dependencies
    findOneMock = jest.spyOn(models.User, "findOne").mockImplementation();
    compareSyncMock = jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);
    signMock = jest.spyOn(jwt, "sign").mockReturnValue("dummyToken");
    sendMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return status 404 if user is not found", async () => {
    findOneMock.mockResolvedValueOnce(null);
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = { status: jest.fn().mockReturnThis(), json: sendMock };

    await signin(req, res);

    expect(findOneMock).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return status 401 if password is invalid", async () => {
    const user = { id: 1, password: "hashedPassword" };
    findOneMock.mockResolvedValueOnce(user);
    compareSyncMock.mockReturnValueOnce(false);
    const req = { body: { email: "test@example.com", password: "wrongPassword" } };
    const res = { status: jest.fn().mockReturnThis(), send: sendMock };

    await signin(req, res);

    expect(compareSyncMock).toHaveBeenCalledWith(
      req.body.password,
      user.password
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      accessToken: null,
      message: "Invalid Password!",
    });
  });

  it("should return status 200 with user details and token if authentication is successful", async () => {
    const user = { id: 1, username: "testuser", email: "test@example.com", name: "Test User", password: "hashedPassword" }; // Replace with actual user object
    findOneMock.mockResolvedValueOnce(user);
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = { status: jest.fn().mockReturnThis(), send: sendMock };

    await signin(req, res);

    expect(signMock).toHaveBeenCalledWith({ id: user.id }, expect.any(String), {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      accessToken: "dummyToken",
    });
  });
});
