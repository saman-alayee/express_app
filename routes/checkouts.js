// // routes/checkout.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Cart = require('../models/cart');
// const CompletedOrder = require('../models/completedOrder');

// router.post('/', auth, async (req, res) => {
//   try {
//     // Find the user's cart
//     const cart = await Cart.findOne({ createdBy: req.userId });

//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Create a completed order based on cart data
//     const completedOrder = new CompletedOrder({
//       user: req.userId,
//       items: cart.items,
//       total: cart.totalCost, // Assuming you calculate the total cost in your cart model
//       // Add other order details here
//     });

//     // Save the completed order
//     await completedOrder.save();

//     // Mark the cart as purchased
//     cart.purchased = true;
//     await cart.save();

//     // Delete the user's cart
//     await Cart.findOneAndDelete({ createdBy: req.userId });

//     res.json({ message: 'Order completed successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;
