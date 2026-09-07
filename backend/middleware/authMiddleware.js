import jwt from "jsonwebtoken";

const authMiddlware = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token: ", token);
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
  console.log("Auth middleware hit");
};

export default authMiddlware;
