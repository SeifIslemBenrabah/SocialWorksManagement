const Programme = require('../models/Programme');
const Pcondition = require('../models/Pcondition');
const Categorie = require('../models/Categorie');
const { Op, Sequelize } = require('sequelize');

const addProgramme = async (req, res) => {
  try {
    const { categorieId, title, description, status, conditions } = req.body;

    if (!categorieId || !title || !description) {
      return res.status(400).json({ error: 'categorieId, title and description are required' });
    }

    const categorie = await Categorie.findOne({ where: { id: categorieId } });
    if (!categorie) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const programme = await Programme.create({ categorieId, title, description, status: status || 'active' });

    if (conditions && conditions.length > 0) {
      const insertConditions = conditions.map((condition) => ({
        programmeId: programme.id,
        Condition: condition.condition || condition,
      }));
      await Pcondition.bulkCreate(insertConditions);
    }

    return res.status(201).json({ message: 'Programme created', programme });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteprogramme = async (req, res) => {
  try {
    const { id } = req.params;
    const programme = await Programme.findOne({ where: { id } });
    if (!programme) {
      return res.status(404).json({ message: 'Programme not found' });
    }
    await Programme.destroy({ where: { id } });
    return res.status(200).json({ message: 'Programme deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await Pcondition.findOne({ where: { id } });
    if (!condition) {
      return res.status(404).json({ message: 'Condition not found' });
    }
    await Pcondition.destroy({ where: { id } });
    return res.status(200).json({ message: 'Condition deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getall = async (req, res) => {
  try {
    const programmes = await Programme.findAll({
      include: [
        { model: Pcondition, attributes: ['id', 'programmeId', 'Condition'] },
        { model: Categorie, attributes: ['CategorieName'] },
      ],
    });
    return res.status(200).json(programmes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getProgrammes = async (req, res) => {
  try {
    let { queryStatus, queryCategorie, queryTitle } = req.query;

    const whereCondition = {};

    if (queryStatus) {
      if (!['active', 'expired'].includes(queryStatus.toLowerCase())) {
        return res.status(400).json({ error: "queryStatus must be 'active' or 'expired'" });
      }
      whereCondition.status = queryStatus.toLowerCase();
    }

    if (queryCategorie) {
      whereCondition.categorieId = queryCategorie;
    }

    if (queryTitle && queryTitle.trim() !== '') {
      whereCondition[Op.and] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
          [Op.like]: `%${queryTitle.toLowerCase()}%`,
        }),
      ];
    }

    const programmes = await Programme.findAll({
      where: whereCondition,
      include: [{ model: Pcondition, attributes: ['id', 'programmeId', 'Condition'] }],
    });

    return res.status(200).json(programmes);
  } catch (err) {
    console.error('Error in getProgrammes:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateprogramme = async (req, res) => {
  try {
    const { id } = req.params;
    const { conditions, ...programmeData } = req.body;

    const programme = await Programme.findOne({ where: { id } });
    if (!programme) {
      return res.status(404).json({ message: 'Programme not found' });
    }

    await Programme.update(programmeData, { where: { id } });

    if (conditions && conditions.length > 0) {
      await Pcondition.destroy({ where: { programmeId: id } });
      const insertConditions = conditions.map((condition) => ({
        programmeId: programme.id,
        Condition: condition.condition || condition,
      }));
      await Pcondition.bulkCreate(insertConditions);
    }

    return res.status(200).json({ message: 'Programme updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addProgramme, deleteprogramme, deleteCondition, getall, updateprogramme, getProgrammes };
