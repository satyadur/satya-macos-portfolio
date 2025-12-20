import Gallery from "../models/Gallery.js";

export const uploadImage = async (req, res) => {
  const image = await Gallery.create({
    image: req.file.path,
    category: req.body.category,
  });
  res.status(201).json(image);
};

export const getGallery = async (req, res) => {
  const images = await Gallery.find();
  res.json(images);
};
