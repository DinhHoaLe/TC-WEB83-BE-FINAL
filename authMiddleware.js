import jwt from "jsonwebtoken"; // Import jwt
const secretKey = process.env.SECRET_KEY || "mysecretkey";

const authMiddleware = {
  authMiddleware: (req, res, next) => {
    const authorization = req.headers["authorization"]?.split(" ");
    if (Array.isArray(authorization)) {
      const token = authorization[1];
      // console.log(token);
      //giải mã token để lấy thông tin user
      if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            console.error("JWT verification failed:", err.message);
          } else {
            req.user = decoded;
            // console.log(decoded);
            next();
          }
        });
      } else {
        return res.status(403).send("Unauthorized");
      }
    } else {
      return res.status(403).send("Unauthorized");
    }
  },
};

export default authMiddleware;
