const jwt = require("jsonwebtoken");


const generateAuthToken = (user) => {       //Δημιουργία του token με το secretKey και τα στοιχεία του χρήστη
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({        //Signature του Token
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
    secretKey
  );
  return token;
};


module.exports = generateAuthToken;