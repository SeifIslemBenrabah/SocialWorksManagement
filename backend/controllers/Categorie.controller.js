const Categorie = require('../models/Categorie');

const addCat = async (req, res) => {
  try {
    const { CategorieName } = req.body;
    if (!CategorieName || !CategorieName.trim()) {
      return res.status(400).json({ error: 'CategorieName is required' });
    }
    const categorie = await Categorie.create({ CategorieName: CategorieName.trim() });
    return res.status(201).json({ message: 'Category created', categorie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCat = async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await Categorie.findOne({ where: { id } });
    if (!cat) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await cat.destroy();
    return res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getall = async (req, res) => {
  try {
    const cats = await Categorie.findAll();
    return res.status(200).json(cats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatecat = async (req, res) => {
  try {
    const { id } = req.params;
    const { CategorieName } = req.body;
    if (!CategorieName || !CategorieName.trim()) {
      return res.status(400).json({ message: 'CategorieName is required' });
    }
    const cat = await Categorie.findOne({ where: { id } });
    if (!cat) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await cat.update({ CategorieName: CategorieName.trim() });
    return res.status(200).json({ message: 'Category updated', cat });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addCat, deleteCat, getall, updatecat };
