import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  const message = await Contact.create(req.body);
  res.status(201).json({ success: true, message });
};
