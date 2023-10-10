const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
  const token = req.header("x-auth-token");     //Ανάκτηση του token που βρίσκεται στον header του request
  if (!token)     //Αν η ανάκτηση αποτύχει
    return res.status(401).send("Access denied. Not authenticated...");
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;      
    const decoded = jwt.verify(token, jwtSecretKey);     //Προσπάθεια επαλήθευσης του JWT με χρήση secretKey που μόνο ο server γνωρίζει

    req.user = decoded;
    next();     //Εκτέλεση επόμενου middleware (αν υπάρχει)
  } catch (ex) {
    res.status(400).send("Access denied. Invalid authentication token...");
  }
};


module.exports = {auth};