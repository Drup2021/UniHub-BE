import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No authorization header found" });
    }

    const tokenFromHeader = authHeader.split(" ")[1];
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) {
      return res.status(401).json({ message: "No refreshToken found" });
    }
    const refreshToken = cookies.jwt;

    const decodedAccessToken = await jwt.verify(
      tokenFromHeader,
      process.env.ACCESS_TOKEN_SECRET_STAMP
    );

    const decodedRefreshToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_STAMP
    );

    if (
      decodedAccessToken.username !== decodedRefreshToken.username ||
      decodedAccessToken.email !== decodedRefreshToken.email
    ) {
      return res.status(403).json({ message: "Stolen Access Token Detected" });
    }

    req.user = {
      username: decodedRefreshToken.username,
      email: decodedRefreshToken.email,
    };

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "JWT verification failed", error: err.message });
  }
};

export default verifyAccessToken;
