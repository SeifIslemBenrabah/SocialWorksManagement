const User = require('../models/User');
const Account = require('../models/Account');
const { UserRole } = require('../models/UserRole');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op, Sequelize } = require('sequelize');

const EMPLOYEE_ROLE_ID = 2;
const COMMITTEE_ROLE_IDS = [3, 4, 5, 6];

const getAllUsers = async (req, res) => {
  try {
    const users = await Account.findAll({
      attributes: { exclude: ['password'] },
      include: [
        { model: User, attributes: ['id', 'fullName', 'email'] },
        { model: UserRole, attributes: ['id', 'roletype', 'roleName'] },
      ],
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployes = async (req, res) => {
  try {
    const employees = await Account.findAll({
      attributes: { exclude: ['password'] },
      where: { roleId: EMPLOYEE_ROLE_ID },
      include: [
        { model: User, attributes: ['id', 'fullName', 'email'] },
        { model: UserRole, attributes: ['id', 'roletype', 'roleName'] },
      ],
    });
    return res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getCommite = async (req, res) => {
  try {
    const members = await Account.findAll({
      attributes: { exclude: ['password'] },
      where: { roleId: COMMITTEE_ROLE_IDS },
      include: [
        { model: User, attributes: ['id', 'fullName', 'email'] },
        { model: UserRole, attributes: ['id', 'roletype', 'roleName'] },
      ],
    });
    return res.status(200).json(members);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getByEmailOrName = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Query parameter q is required' });
    }
    const users = await User.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullName')), {
            [Op.like]: `%${q.toLowerCase()}%`,
          }),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), {
            [Op.like]: `%${q.toLowerCase()}%`,
          }),
        ],
      },
      include: [
        {
          model: Account,
          attributes: { exclude: ['password'] },
          include: [{ model: UserRole, attributes: ['id', 'roletype', 'roleName'] }],
        },
      ],
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, roleId } = req.body;

    if (!fullName || !email || !password || !roleId) {
      return res.status(400).json({ error: 'fullName, email, password and roleId are required' });
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const role = await UserRole.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ error: 'Invalid roleId' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ fullName, email: email.toLowerCase() });
    const account = await Account.create({ userId: user.id, roleId, password: hashedPassword });

    return res.status(201).json({
      user: { id: user.id, fullName: user.fullName, email: user.email },
      accountId: account.id,
      roletype: role.roletype,
      roleName: role.roleName,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      include: [
        {
          model: Account,
          include: [{ model: UserRole }],
        },
      ],
    });

    if (!user || !user.Accounts || user.Accounts.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const account = user.Accounts[0];
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    const roletype = account.UserRole.roletype;
    const roleName = account.UserRole.roleName;

    const accessToken = jwt.sign(
      { id: user.id, accountId: account.id, roleId: account.roleId, roletype },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      accessToken,
      user: { id: user.id, fullName: user.fullName, email: user.email },
      roletype,
      roleName,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updateData = {};
    if (fullName && fullName.trim()) updateData.fullName = fullName.trim();
    if (email && email.trim()) updateData.email = email.toLowerCase().trim();
    if (Object.keys(updateData).length > 0) await user.update(updateData);

    if (newPassword && newPassword.trim().length >= 8) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await Account.update({ password: hashedPassword }, { where: { id: req.user.accountId } });
    }

    return res.status(200).json({ id: user.id, fullName: user.fullName, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { fullName, email } = req.body;
    await user.update({ fullName, email });
    return res.status(200).json({ id: user.id, fullName: user.fullName, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Account not found' });
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getEmployes,
  getCommite,
  getByEmailOrName,
  createUser,
  loginUser,
  updateProfile,
  updateUser,
  deleteAccount,
};
