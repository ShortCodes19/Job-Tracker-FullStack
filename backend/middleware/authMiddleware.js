import jwt from "jsonwebtoken";

const authMiddlware = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return next("Authentication required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next("Invalid or expired token");
  }
};

export default authMiddlware;
