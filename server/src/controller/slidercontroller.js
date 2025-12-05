import Slide from "../model/slidesModel.js";

// Create new slide
export const createSlide = async (req, res) => {
  try {
    const slide = new Slide(req.body);
    await slide.save();
    // ✅ return created slide
    res.status(201).json({ message: "Slide created", status: true, slide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};

// Get all slides
export const getSlides = async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json({ status: true, slides });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};

// Update slide
export const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const slide = await Slide.findByIdAndUpdate(id, updates, { new: true });
    if (!slide) return res.status(404).json({ message: "Slide not found", status: false });

    res.status(200).json({ message: "Slide updated successfully", status: true, slide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};

// Delete slide
export const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await Slide.findByIdAndDelete(id);
    if (!slide) return res.status(404).json({ message: "Slide not found", status: false });

    res.status(200).json({ message: "Slide deleted successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", status: false });
  }
};
