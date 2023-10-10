const  {Order}  = require("../models/order");
const {auth} = require("../middleware/auth");
const {isAdmin, isUser} = require('../middleware/authorization')
const router = require("express").Router();


//CREATE
// createOrder is fired by stripe webhook... check stripe.js


router.put("/:id", isAdmin, async (req, res) => {       //Update της κατάστασης μιας order με βάση το id της
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }        //Επιστρέφει την ενημερωμένη παραγγελία
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", isAdmin, async (req, res) => {      //Ανάκτηση όλων των orders που έχουν γίνει
    const query = req.query.new;
  
    try {
      const orders = query
        ? await Order.find().sort({ _id: -1 }).limit(4)
        : await Order.find().sort({ _id: -1 });
      res.status(200).send(orders);
    } catch (err) {
      res.status(500).send(err);
    }
});

router.get("/findOne/:id", auth, async (req, res) => {      //Ανάκτηση μιας order με βάση το id της (View)
  try {
    const order = await Order.findById(req.params.id);

    if (req.user._id !== order.userId || !req.user.isAdmin)
      return res.status(403).send("Access denied. Not authorized...");

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;


//Delete μιας order με βάση το id της
// router.delete("/:id", isAdmin, async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).send("Order has been deleted...");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


// Ανάκτηση των orders ενός User
// router.get("/find/:userId", isUser, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

