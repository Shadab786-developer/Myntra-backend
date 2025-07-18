import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductList } from "../models/productList.models.js";

const getProductList = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page

    const skip = (page - 1) * limit; // Calculate the number of items to skip

    const product = await ProductList.find({})
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const totalProducts = await ProductList.countDocuments();

    return res.status(200).json(
      new ApiResponse(200, "Product list fetched successfully", {
        totalProducts,
        currentPage: page,
        totalProductsPages: Math.ceil(totalProducts / limit),
        products: product,
      })
    );
  } catch (err) {
    console.log("Error fetching product list:", err.message);
    throw new ApiError(500, "Failed to fetch list of products");
  }
});
const getProductsWithOutPageLimit = asyncHandler(async (req, res) => {
  try {
    const product = await ProductList.find({});

    return res.status(200).json(
      new ApiResponse(200, "Product list fetched successfully", {
        products: product,
      })
    );
  } catch (err) {
    console.log("Error fetching product list:", err.message);
    throw new ApiError(500, "Failed to fetch list of products");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await ProductList.findById(req.params.id).select("-__v");

    // Check if product exists
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Return the product details
    return res
      .status(200)
      .json(new ApiResponse(200, "Product fetched successfully", product));
  } catch (err) {
    console.log("Error fetching product by ID:", err.message);
    throw new ApiError(500, "Failed to fetch product by ID");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    item_image,
    item_type,
    rating,
    color,
    quantity,
    company_name,
    item_name,
    current_price,
    original_price,
    discount_percentage,
    return_period,
    delivery_date,
  } = req.body;

  //validate the input
  if (
    [
      item_image,
      item_type,
      rating,
      color,
      quantity,
      company_name,
      item_name,
      current_price,
      original_price,
      discount_percentage,
      return_period,
      delivery_date,
    ].some((field) => {
      // If field is a string, trim and check
      if (typeof field === "string") return field.trim() === "";
      // If field is undefined or null
      if (field === undefined || field === null) return true;
      // Otherwise, for numbers/objects, just check if falsy (0 is allowed for numbers)
      return false;
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the product already exists
  const existeProduct = await ProductList.findOne({ item_name });

  if (existeProduct) {
    throw new ApiError(409, "Product already exists with this item name");
  }

  try {
    // Create a new product
    const product = await ProductList.create({
      item_image,
      item_type,
      rating: {
        stars: rating.stars,
        noOfReviews: rating.noOfReviews,
      },
      color,
      quantity,
      company_name,
      item_name,
      current_price,
      original_price,
      discount_percentage,
      return_period,
      delivery_date,
    });

    const createdProduct = await ProductList.findById(product._id).select(
      "-__v"
    );

    if (!createdProduct) {
      throw new ApiError(500, "Failed to create product");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Product created successfully", createdProduct)
      );
  } catch (err) {
    console.log("Error creating product:", err.message);
    throw new ApiError(400, "Failed to create product");
  }
});

export {
  getProductById,
  getProductList,
  addProduct,
  getProductsWithOutPageLimit,
};
