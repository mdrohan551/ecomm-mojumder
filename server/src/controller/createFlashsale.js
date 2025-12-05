import FlashSaleProduct from "../model/flashSaleModel.js";

// Create new flash sale product
export const createFlashSaleProduct = async (req, res) => {
  try {
    const { name, title, description, image, toCartQuantity, price, oldPrice, public_id, instock } = req.body;

    const product = new FlashSaleProduct({
      name,
      title,
      description,
      image: image || (public_id ? [public_id] : []),
      toCartQuantity: toCartQuantity || 1,
      price,
      oldPrice,
      public_id,
      instock
    });

    await product.save();

    // ✅ return the created product
    res.status(201).json({ message: "Flash sale product created", status: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};


// Get all flash sale products
export const getFlashSaleProducts = async (req, res) => {
  try {
    const products = await FlashSaleProduct.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};

// Update product
export const updateFlashSaleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await FlashSaleProduct.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", status: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};

// Delete product
export const deleteFlashSaleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await FlashSaleProduct.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};
