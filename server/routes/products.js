const { Product } = require("../models/product");
const {isAdmin} = require('../middleware/authorization')
const cloudinary = require("../utils/cloudinary");
const router = require("express").Router();



router.post("/", isAdmin, async (req, res) => {         //Δημιουργία ενός νέου βιβλίου
  const { name, description, price, image } = req.body;

  try {
    if(image) {         //Αν έχει εισαχθεί εικόνα από τον χρήστη, γίνεται upload στο cloudinary
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: 'ruabirjg',
      });

      if(uploadRes) {
        const product = new Product({       //Δημιουργία νέου βιβλίου
          name,
          description,
          price,
          image: uploadRes,
        });
        const savedProduct = await product.save();      //Αποθήκευση στη βάση δεδομένων
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/', async (req,res) => {        //Ανάκτηση όλων των βιβλίων που βρίσκονται στη βάση
    try{
      const products = await Product.find();
      res.status(200).send(products);
    }catch(error){
      res.status(500).send(error);
    }
})


router.delete("/:id", isAdmin, async (req, res) => {        //Διαγραφή ενός βιβλίου
  try {
    const product = await Product.findById(req.params.id);      //Εύρεση ενός βιβλίου με βάση το id
    if(!product) return res.status(404).send("Book not found...");

    if(product.image.public_id) {
      const destroyResponse = await cloudinary.uploader.destroy(     //Διαγραφή της εικόνας από το cloudinary
        product.image.public_id
      );

    if(destroyResponse) {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      res.status(200).send(deletedProduct);
    }
    }else {
      console.log("Action terminated. Failed to deleted product image...");
    }
  }catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", isAdmin, async (req, res) => {       //Edit στα στοιχεία ενός βιβλίου
  if(req.body.productImg) {
    const destroyResponse = await cloudinary.uploader.destroy(      //Αν εισάγεται νέα εικόνα, τότε διαγράφεται η παλιά
      req.body.product.image.public_id
    );

    if(destroyResponse) {
      const uploadedResponse = await cloudinary.uploader.upload(    //και προστίθεται η νέα
        req.body.productImg,{
          upload_preset: "ruabirjg",
        }
      );

      if(uploadedResponse) {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{      //Ενημέρωση του βιβλίου με τα νέα στοιχεία (+εικόνα)
            $set: {
              ...req.body.product,
              image: uploadedResponse,
            },
          },
          {new: true}
        );
        res.status(200).send(updatedProduct);
      }
    }
  }else{
    try{
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{      //Αν δεν εισάγεται νέα εικόνα, τότε ενημέρωση του βιβλίου χωρίς αλλαγή εικόνας
          $set: req.body.product,
        },
        {new: true}
      );
      res.status(200).send(updatedProduct);
    }catch (err) {
      res.status(500).send(err);
    }
  }
});

router.get("/find/:id", async (req, res) => {         //Ανάκτηση ενός βιβλίου με βάση το id του (View)
  try {
    const product = await Product.findById(req.params.id);      //Εύρεση του βιβλίου με βάση το id
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;