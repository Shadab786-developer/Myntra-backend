import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ProductList } from "../models/productList.models.js";

const filterByCategory = asyncHandler(async (req, res) => {
  try {
    const { categories } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    // Validate category input
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      throw new ApiError(400, "Category is not provided");
    }

    // Create the filter
    const filterQuery = {
      item_type: { $in: categories },
    };

    // Fetch products with pagination
    const products = await ProductList.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .select("-__v");

    // Count total matching products
    const totalFiltered = await ProductList.countDocuments(filterQuery);
    // Send paginated and filtered response
    return res.status(200).json(
      new ApiResponse(200, "Filtered Products Fetched Successfully", {
        totalProducts: totalFiltered,
        currentPage: page,
        totalPages: Math.ceil(totalFiltered / limit),
        products: products,
      })
    );
  } catch (error) {
    console.log("Error to filtering the products by Category", error.message);
    throw new ApiError(500, "Failed to Filtering the Product by Category");
  }
});

const filterByCurrentPrice = asyncHandler(async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;

    if (minPrice === null && maxPrice === null) {
      throw new ApiError(400, "Current Price is not provided");
    }
    const priceFilter = {};
    if (minPrice != null) priceFilter.$gte = minPrice;
    if (maxPrice != null) priceFilter.$lte = maxPrice;

    const price = await ProductList.find({
      current_price: priceFilter,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Filter Product By Current Price", price));
  } catch (err) {
    console.log("Error to filtering the products by Current Price");
    throw new ApiError(500, "Failed to Filtering the Product by Current Price");
  }
});

const filterByCompanyName = asyncHandler(async (req, res) => {
  try {
    const { companyNames } = req.body;

    if (
      !companyNames ||
      !Array.isArray(companyNames) ||
      companyNames.length === 0
    ) {
      throw new ApiError(400, "Company name is not provided");
    }

    const company = await ProductList.find({
      company_name: { $in: companyNames },
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Filter Product By Company Name", company));
  } catch (err) {
    console.log("Error to filtering the products by Company name");
    throw new ApiError(500, "Failed to Filtering the Product by Company name");
  }
});

const filterByDiscount = asyncHandler(async (req, res) => {
  try {
    const { minDiscount, maxDiscount } = req.body;

    if (minDiscount === null && maxDiscount === null) {
      throw new ApiError(400, "Current Price is not provided");
    }
    const discountFilter = {};
    if (minDiscount != null) discountFilter.$gte = minDiscount;
    if (maxDiscount != null) discountFilter.$lte = maxDiscount;

    const discount = await ProductList.find({
      discount_percentage: discountFilter,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Filter Product By Discount percentage", discount)
      );
  } catch (err) {
    console.log("Error to filtering the products by Discount Percentage");
    throw new ApiError(
      500,
      "Failed to Filtering the Product by Discount Percentage"
    );
  }
});

const filterByColor = asyncHandler(async (req, res) => {
  try {
    const { colors } = req.body; // Expecting: { colors: ["Red", "Blue"] }

    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      throw new ApiError(400, "Color(s) not provided");
    }

    const colorProduct = await ProductList.find({
      color: { $in: colors },
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Filter Product By Color", colorProduct));
  } catch (err) {
    console.log("Error filtering products by color:", err.message);
    throw new ApiError(500, "Failed to filter products by color");
  }
});

export {
  filterByCategory,
  filterByCurrentPrice,
  filterByCompanyName,
  filterByDiscount,
  filterByColor,
};
