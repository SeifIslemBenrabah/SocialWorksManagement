const Account = require('../models/Account');
const Meet = require('../models/Meet');
const { UserRole } = require('../models/UserRole');
const User = require('../models/User');
const { Op, Sequelize } = require('sequelize');

const COMMITTEE_ROLE_IDS = [3, 4, 5, 6];

const createMeet = async (req, res) => {
  try {
    const { name, date, time, meetmembers } = req.body;
    if (!name || !date || !time || !meetmembers) {
      return res.status(400).json({ error: 'name, date, time and meetmembers are required' });
    }

    const meet = await Meet.create({ name, date, time });

    const validAccounts = await Account.findAll({
      where: { id: meetmembers },
      include: { model: UserRole, where: { id: COMMITTEE_ROLE_IDS } },
    });

    if (validAccounts.length === 0) {
      return res.status(400).json({ error: 'No valid committee members found in provided IDs' });
    }

    await meet.addAccounts(validAccounts);
    return res.status(201).json({ message: 'Meeting created successfully', meet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMeets = async (req, res) => {
  try {
    const meets = await Meet.findAll({
      include: [
        {
          model: Account,
          attributes: ['userId', 'roleId'],
          include: [
            { model: User, attributes: ['id', 'fullName', 'email'] },
            { model: UserRole, attributes: ['id', 'roleName'] },
          ],
          where: { roleId: COMMITTEE_ROLE_IDS },
        },
      ],
    });

    return res.status(200).json(meets);
  } catch (err) {
    console.error('Error fetching meetings:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await Account.findAll({
      attributes: { exclude: ['password'] },
      where: { roleId: COMMITTEE_ROLE_IDS },
      include: [{ model: User, attributes: ['id', 'fullName', 'email'] }],
    });
    return res.status(200).json(members);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const meet = await Meet.findOne({
      where: { id },
      include: [
        {
          model: Account,
          attributes: ['userId', 'roleId'],
          include: [
            { model: User, attributes: ['id', 'fullName', 'email'] },
            { model: UserRole, attributes: ['id', 'roleName'] },
          ],
          where: { roleId: COMMITTEE_ROLE_IDS },
        },
      ],
    });
    if (!meet) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    return res.status(200).json(meet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getByName = async (req, res) => {
  try {
    const { queryName } = req.query;
    const whereCondition = {};

    if (queryName && queryName.trim() !== '') {
      whereCondition[Op.and] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), {
          [Op.like]: `%${queryName.toLowerCase()}%`,
        }),
      ];
    }

    const meets = await Meet.findAll({
      where: whereCondition,
      include: [
        {
          model: Account,
          attributes: ['userId', 'roleId'],
          include: [
            { model: User, attributes: ['id', 'fullName', 'email'] },
            { model: UserRole, attributes: ['id', 'roleName'] },
          ],
          where: { roleId: COMMITTEE_ROLE_IDS },
        },
      ],
    });

    return res.status(200).json(meets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createMeet, getMeets, getMembers, getById, getByName };
