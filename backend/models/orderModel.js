import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    // Array of order items
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        // name: {type: string},
        size: { type: String }, // optional, if you have sizes
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // snapshot of price at purchase time
      },
    ],

    amount: { type: Number, required: true },

    // Structured address
    address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    status: { type: String, required: true, default: "Order placed" },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
  },
  { timestamps: true } // 👈 adds createdAt, updatedAt automatically
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
