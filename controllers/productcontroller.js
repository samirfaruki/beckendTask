const Product = require("../model/database");

// Create a new product
exports.createProduct = (req, res) => {
  const { category, title, description, quantity, price, currency } = req.body;

  const product = new Product({
    category,
    title,
    description,
    quantity,
    price,
    currency,
  });

  product
    .save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Could not create product",
      });
    });
};

// Get all products with implementing Pagination



exports.getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 3; // default to 10 items per page if not specified
  const startIndex = (page - 1) * limit;

  try {
    const products = await Product.find()
      .skip(startIndex)
      .limit(limit)
      .exec();

    const count = await Product.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);

    let prevPage = null;
    let nextPage = null;

    if (page > 1) {
      prevPage = `http://${req.headers.host}${req.baseUrl}?page=${page - 1}&limit=${limit}`;
    }

    if (page < totalPages) {
      nextPage = `http://${req.headers.host}${req.baseUrl}?page=${page + 1}&limit=${limit}`;
    }

    res.set('Link', [
      prevPage && `<${prevPage}>; rel="prev"`,
      nextPage && `<${nextPage}>; rel="next"`
    ].filter(Boolean).join(','));

    res.send({
      products: products,
      currentPage: page,
      totalPages: totalPages,
      totalItems: count
    });
  } catch (err) {
    res.status(400).json({
      error: "Could not retrieve products",
    });
  }
};



// Get product by Category
exports.getProductsByCategory= async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.send(products);
  } catch (err) {
    res.status(400).json({
      error: "Could not retrieve products",
    });
  }
};

// Delete a product by ID

exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndRemove(productId);
    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: "Product not found",
    });
  }
};

