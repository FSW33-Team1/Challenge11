const jwt = require('jsonwebtoken');
const authJwt = require('./authJwt.js');

describe('Auth JWT', () => {
  let jwtVerifyMock;
  let sendMock;

  beforeEach(() => {
    // Mock the necessary dependencies
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    nextMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('verifyToken', () => {
    it('should return 403 if no token is provided', () => {
      const req = { headers: {} };
      const res = {
        status: statusMock,
        send: sendMock,
      };
      const next = nextMock;

      authJwt.verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({
        message: "No token provided!"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token verification fails', () => {
      const req = {
        headers: {
          'x-access-token': 'invalid-token'
        }
      };
      const res = {
        status: statusMock,
        send: sendMock,
      };
      const next = nextMock;
      jwtVerifyMock = jest.spyOn(jwt, "verify").mockImplementation(
        (token, secretKey, callback) => {
            callback(new Error('Invalid token'))
        });

      authJwt.verifyToken(req, res, next);

      expect(jwtVerifyMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        message: "Unauthorized!",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should set userId in request and call next if token verification succeeds', () => {

      const req = {
        headers: {
          'x-access-token': 'valid-token'
        }
      };
      const res = {};
      const next = jest.fn();
      jwtVerifyMock = jest.spyOn(jwt, "verify").mockImplementation(
        (token, secretKey, callback) => {
            callback(null, {id: 1})
        });

      authJwt.verifyToken(req, res, next);

      expect(jwtVerifyMock).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
