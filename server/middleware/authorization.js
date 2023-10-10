const {auth} = require('./auth');


const isUser = (req, res, next) => {
  auth(req, res, () => {          //Αφου ο χρήστης αυθεντικοποιηθεί
    //Αν το id του χρήστη είναι ίδιο με το id του URL ή αν η isAdmin είναι true (O Admin είναι και Customer)
    if (req.user._id === req.params.id || req.user.isAdmin) {     
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};


module.exports = {isUser, isAdmin};