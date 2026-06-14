const { Op, Sequelize } = require('sequelize');
const Demand = require('../models/Demande');
const Programme = require('../models/Programme');
const User = require('../models/User');
const File = require('../models/File');
const Categorie = require('../models/Categorie');
const fs = require('fs');
const path = require('path');

const addDemand = async (req, res) => {
  try {
    const { userId, programmeId, status } = req.body;
    const files = req.files || [];

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }
    if (!programmeId || isNaN(programmeId)) {
      return res.status(400).json({ error: 'Invalid or missing programmeId' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.status(404).json({ error: 'Programme not found' });

    const demand = await Demand.create({ userId, programmeId, status: status || 'Waiting' });

    if (files.length > 0) {
      const fileData = files.map((file) => ({
        demandeId: demand.id,
        name: file.originalname,
        path: `uploads/${file.filename}`,
      }));
      await File.bulkCreate(fileData);
    }

    return res.status(201).json({ message: 'Demand created successfully', demand });
  } catch (err) {
    console.error('Error in addDemand:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletedemand = async (req, res) => {
  try {
    const { id } = req.params;

    const demand = await Demand.findOne({ where: { id } });
    if (!demand) return res.status(404).json({ error: 'Demand not found' });

    const files = await File.findAll({ where: { demandeId: id } });
    files.forEach((file) => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });

    await File.destroy({ where: { demandeId: id } });
    await Demand.destroy({ where: { id } });

    return res.status(200).json({ message: 'Demand and its files deleted successfully' });
  } catch (err) {
    console.error('Error in deletedemand:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getall = async (req, res) => {
  try {
    const demandes = await Demand.findAll({
      include: [
        { model: File, attributes: ['id', 'name', 'path'] },
        {
          model: Programme,
          attributes: ['title'],
          include: [{ model: Categorie, attributes: ['CategorieName'] }],
        },
      ],
    });
    return res.status(200).json(demandes);
  } catch (err) {
    console.error('Error in getall:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatedemand = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const demand = await Demand.findOne({ where: { id } });
    if (!demand) {
      return res.status(404).json({ error: 'Demand not found' });
    }

    const validStatuses = ['Accepted', 'Complete', 'Waiting', 'Incomplete'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    await demand.update({ status });

    if (req.files && req.files.length > 0) {
      const existingFiles = await File.findAll({ where: { demandeId: id } });
      existingFiles.forEach((f) => {
        if (fs.existsSync(f.path)) fs.unlinkSync(f.path);
      });
      await File.destroy({ where: { demandeId: id } });

      const insertFiles = req.files.map((file) => ({
        demandeId: id,
        name: file.originalname,
        path: `uploads/${file.filename}`,
      }));
      await File.bulkCreate(insertFiles);
    }

    return res.status(200).json({ message: 'Demand updated successfully' });
  } catch (err) {
    console.error('Error in updatedemand:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getDemands = async (req, res) => {
  try {
    const { queryCategorie, queryTitle } = req.query;

    const whereCondition = {};

    if (queryCategorie) {
      whereCondition.categorieId = queryCategorie;
    }

    if (queryTitle && queryTitle.trim() !== '') {
      whereCondition[Op.and] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Programme.title')), {
          [Op.like]: `%${queryTitle.toLowerCase()}%`,
        }),
      ];
    }

    const demandes = await Demand.findAll({
      include: [
        {
          model: Programme,
          where: Object.keys(whereCondition).length ? whereCondition : undefined,
          attributes: ['id', 'categorieId', 'title', 'description'],
        },
      ],
    });

    return res.status(200).json(demandes);
  } catch (err) {
    console.error('Error in getDemands:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addDemand, deletedemand, getall, updatedemand, getDemands };
