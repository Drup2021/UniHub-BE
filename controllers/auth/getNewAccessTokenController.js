import registeredUsers from "../../models/registeredUsers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateAccessToken from "../../utils/auth/generateAccessToken.js";
dotenv.config();

const getNewAccessToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt)
      return res.status(401).json({ message: "No jwt cookie found" });

    const refreshToken = cookies.jwt;

    const user = await registeredUsers.findOne({
      refreshToken: refreshToken,
    });

    if (!user)
      return res
        .status(403)
        .json({ message: "No such user with that refresh token" });

    if (user.report > 30) {
      user.isBlacklisted = true;
      await user.save();
    }

    if (user.isBlacklisted) {
      return res.status(403).json({ message: "User Blacklisted" });
    }

    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_STAMP,
      (err, decodedInfoFromKey) => {
        if (
          err ||
          user.username !== decodedInfoFromKey.username ||
          user.email !== decodedInfoFromKey.email
        )
          return res
            .status(403)
            .json({ message: "Wrong/Expired refreshToken" });

        const accessToken = generateAccessToken(user);
        return res.status(201).json({ accessToken });
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default getNewAccessToken;
