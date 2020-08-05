"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const auth = async (req, res, next) => {
  const auth_header = req.headers.authorization;

  if (!auth_header) {
    return res.status(401).json({
      message: 'erro no cabeçalho'
    });
  }

  const [, token] = auth_header.split(' ');

  try {
    await jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'token expirou ou invalido'
    });
  }
};

exports.auth = auth;