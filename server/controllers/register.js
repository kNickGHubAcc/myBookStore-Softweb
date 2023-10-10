const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const Joi = require("joi");
const generateAuthToken = require("../utils/genAuthToken");


const register = async (req, res) => {
    const schema = Joi.object({           //Ορισμός κανόνων-περιορισμών σχετικά με τα δεδομένα εισόδου του χρήστη
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(50).required().email(),
      password: Joi.string().min(6).max(50).required(),
    });
  
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });     //Αναζήτηση του χρήστη στη βάση δεδομένων με βάση το εισαχθέν email
    if(user) return res.status(400).send("User already exists");  //Αν υπάρχει στη βάση δεν εγγράφεται και εμφανίζεται κατάλληλο μήνυμα
  
    //Αν η εγγραφή είναι επιτυχής
    const {name, email, password} = req.body;
    user = new User({ name, email, password });     //Δημιουργία νέου χρήστη 
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);     //Κρυπτογράφηση του password του
    await user.save();       //Αποθήκευση του χρήστη στη βάση δεδομένων
  
    const token = generateAuthToken(user);
    res.send(token);
}


module.exports = register;