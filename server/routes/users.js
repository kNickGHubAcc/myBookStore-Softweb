const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const {isUser, isAdmin} = require('../middleware/authorization')

const router = require("express").Router();



router.get("/", isAdmin, async (req, res) => {          //Ανάκτηση όλων των χρηστών που βρίσκονται στη βάση
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", isAdmin, async (req, res) => {        //Διαγραφή ενός χρήστη
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);      //Εύρεση και διαγραφή ενός χρήστη με βάση το id
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/find/:id", isUser, async (req, res) => {       //Ανάκτηση των στοιχείων ενός χρήστη (View)
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send({      //Επιστροφή μόνο των στοιχείων που πρέπει να δει ένας χρήστης (όχι password)
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", isUser, async (req, res) => {      //Update των στοιχείων ενός χρήστη
  try {
    const user = await User.findById(req.params.id);

    if(!(user.email === req.body.email)) {        //Έλεγχος αν το email υπάρχει ήδη στη βάση δεδομένων
      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse)
        return res.status(400).send("That email is already taken...");
    }

    if(req.body.password && user) {       //Αν παρέχεται νέο password τότε αυτό κρυπτογραφείται
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(     //Ενημέρωση των στοιχείων του χρήστη με τα νεα δεδομένα
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        password: user.password,
      },
      { new: true }
    );

    res.status(200).send({          //Επιστροφή των ενημερωμένων στοιχείων
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;