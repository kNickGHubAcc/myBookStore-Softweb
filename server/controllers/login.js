const bcrypt = require("bcryptjs");
const {User} = require("../models/user");
const Joi = require("joi");
const generateAuthToken = require("../utils/genAuthToken");


const login = async (req, res) => {
  const schema = Joi.object({           //Ορισμός κανόνων-περιορισμών σχετικά με τα δεδομένα εισόδου του χρήστη
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const{error} = schema.validate(req.body);       //Έλεγχος εγκυρότητας των δεδομένων εισόδου με βάση το παραπάνω schema
  if(error) return res.status(400).send(error.details[0].message);     //Επιστροφή κατάλληλων μηνυμάτων σε περίπτωση παραβίασης των περιορισμών

  let user = await User.findOne({ email: req.body.email });     //Αναζήτηση του χρήστη στη βάση δεδομένων με βάση το εισαχθέν email
  if (!user) return res.status(400).send("Wrong email");

  //Αν ο χρήστης βρίσκεται στη βάση δεδομένων
  const validPassword = await bcrypt.compare(req.body.password, user.password);   //Σύγκριση του password που εισάγεται με password που βρίσκεται στη βάση
  if(!validPassword) return res.status(400).send("Wrong password");

  const token = generateAuthToken(user);     //Δημιουργία ενός JWT και αποστολή στον χρήστη
  res.send(token);
};


module.exports = login;