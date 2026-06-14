const { Op, Sequelize } = require('sequelize');
const Payment = require('../models/Payment');

const addpayment = async (req, res) => {
  try {
    const { paymentTitle, paymentDate, paymentMontant, paymentType } = req.body;
    if (!paymentTitle || !paymentDate || !paymentMontant || !paymentType) {
      return res.status(400).json({ error: 'paymentTitle, paymentDate, paymentMontant and paymentType are required' });
    }
    if (!['Oncasement', 'Decasement'].includes(paymentType)) {
      return res.status(400).json({ error: "paymentType must be 'Oncasement' or 'Decasement'" });
    }
    if (isNaN(paymentMontant) || Number(paymentMontant) < 0) {
      return res.status(400).json({ error: 'paymentMontant must be a positive number' });
    }
    const payment = await Payment.create({ paymentTitle, paymentDate, paymentMontant, paymentType });
    return res.status(201).json({ message: 'Payment added successfully', payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getall = async (req, res) => {
  try {
    const payments = await Payment.findAll({});
    return res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatepayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({ where: { id } });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    await Payment.update(req.body, { where: { id } });
    const updated = await Payment.findOne({ where: { id } });
    return res.status(200).json({ message: 'Payment updated successfully', payment: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }
    const payment = await Payment.findOne({ where: { id } });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    await Payment.destroy({ where: { id } });
    return res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getPayment = async (req, res) => {
  try {
    let { queryType, queryTitle } = req.query;

    const whereCondition = {};

    if (queryType) {
      if (!['Oncasement', 'Decasement'].includes(queryType)) {
        return res.status(400).json({ error: "queryType must be 'Oncasement' or 'Decasement'" });
      }
      whereCondition.paymentType = queryType;
    }

    if (queryTitle && queryTitle.trim() !== '') {
      whereCondition[Op.and] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('paymentTitle')), {
          [Op.like]: `%${queryTitle.toLowerCase()}%`,
        }),
      ];
    }

    const payments = await Payment.findAll({ where: whereCondition });
    return res.status(200).json(payments);
  } catch (err) {
    console.error('Error in getPayment:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addpayment, getPayment, getall, updatepayment, deletePayment };
