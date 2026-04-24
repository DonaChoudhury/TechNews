const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Postman/Frontend se Header mein token aayega
  const token = req.header('Authorization');

  // 2. Agar token nahi hai, toh access deny kardo
  if (!token) {
    return res.status(401).json({ message: "Access Denied! Please login first." });
  }

  try {
    // 3. 'Bearer <token>' format me aata hai, toh split karke actual token nikalte hain
    const actualToken = token.split(" ")[1];
    
    // 4. Token verify karo secret key ke sath
    const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    // 5. User ki ID request mein daal do aage wale routes ke liye
    req.user = verified;
    
    // 6. Security check pass! Ab aage badhne do
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

module.exports = authMiddleware;