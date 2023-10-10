const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();


//Δημιουργία ενός checkout session
router.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({        //Δημιουργία νέου Customer στο Stripe
    metadata: {
      userId: req.body.userId,
    },
  })

  const line_items = req.body.cartItems.map((item) => {     //Δημιουργία πίνακα με τα στοιχεία της αγοράς που πραγματοποιήθηκε
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image?.url],
          description: item.description,
          metadata: {
            id: item.id
          },
        },
        unit_amount: item.price * 100
      },
      quantity: item.cartQuantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer: customer.id,
    success_url:`https://my-book-store-softweb-cl.vercel.app/checkout-success`,
    cancel_url:`https://my-book-store-softweb-cl.vercel.app/cart`,
  });
  res.send({url: session.url});
});

const createOrder = async (customer, data, lineItems) => {      //Δημιουργία της παραγγελίας μετά την πληρωμή
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    payment_status: data.payment_status,
  });

  try{
    await newOrder.save();        ///Αποθήκευση της παραγγελίας στη βάση δεδομένων
  }catch (err){
    console.log(err);
  }
};

router.post('/webhook', express.json({type: 'application/json'}), (req, res) => {   //Λήψη events από το Stripe
  let data;
  let eventType;
  let webhookSecret ;

  if(webhookSecret){
    let event;
    const sig = req.headers['stripe-signature'];
    try{
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }catch (err) {
      res.sendStatus(400);
      return;
    }
    data = event.data.object
    eventType = event.type
  }else{
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if(eventType === "checkout.session.completed"){
    stripe.customers
    .retrieve(data.customer)           //Ανάκτηση του Customer από το Stripe
    .then((customer) => {
      stripe.checkout.sessions.listLineItems(
        data.id,
        {},
        function(err, lineItems){
          createOrder(customer, data, lineItems);    //Δημιουργία παραγγελίας με τα data του Customer, του session και της αγοράς 
        }
      )
    })
    .catch(err => console.log(err.message))
  }
  res.status(200).end();
});


module.exports = router;