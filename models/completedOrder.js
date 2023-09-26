// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model
//     required: true,
//   },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product', // Reference to the Product model
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   totalCost: {
//     type: Number,
//     required: true,
//   },
//   purchased: {
//     type: Boolean,
//     default: false,
//   },
//   // Add other cart details here
// });

// module.exports = mongoose.model('Cart', cartSchema);
