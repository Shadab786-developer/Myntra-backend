import mongoose from "mongoose";

const productListSchema = new mongoose.Schema(
  {
    item_image: { type: String, required: true },
    item_type: { type: String, required: true },
    rating: {
      stars: { type: Number, required: true },
      noOfReviews: { type: String, required: true },
    },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    company_name: { type: String, required: true },
    item_name: { type: String, required: true },
    current_price: { type: Number, required: true },
    original_price: { type: Number, required: true },
    discount_percentage: { type: Number, required: true },
    return_period: { type: String, required: true }, //e.g. 30 days
    delivery_date: { type: String, required: true }, //e.g. 2-3 days
  },
  { timestamps: true }
);

export const ProductList = mongoose.model("ProductList", productListSchema);
