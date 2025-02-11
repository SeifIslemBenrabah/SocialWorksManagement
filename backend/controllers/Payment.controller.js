const { where, Op } = require('sequelize')
const Payment = require('../models/Payment')
const addpayment = async(req,res)=>{
    try{
        const {paymentTitle,paymentDate,paymentMontant,paymentType} = req.body
        if(!paymentTitle || !paymentDate || !paymentMontant || !paymentType){
           return res.status(403).send('wrong body')
        }
        const payment = await Payment.create({paymentTitle:paymentTitle,paymentDate:paymentDate,paymentMontant:paymentMontant,paymentType:paymentType})
        return res.status(203).json({msg:"payment add successfully",payment})
    }catch(err){
        res.status(500).send(err)
    }
}
const getall = async(req,res)=>{
    try{
        const payments = await Payment.findAll({})
        if(payments.length === 0){
            return res.status(404).json({msg:"no payment found"})
        }
        return res.status(200).json(payments)
    }catch(err){
        res.status(500).send(err)
    }
}
const updatepayment = async(req,res)=>{
    try{
        const {id} = req.params;
        const payment = await Payment.findOne({where:{id:id}})
        if(!payment){
            return res.status(404).send('there is no payment with this id')
        }
        await Payment.updateId(req.body,{where:{id:id}})
        return res.status(200).json(payment)
    }
    catch(err){
        res.status(500).send(err)
    }
}
const deletePayment = async(req,res)=>{
    try{
        const {id} = req.params
        if(!id){
            return res.status(400).send('need the id to delete')
        }
        const payment = await Payment.findOne({where:{id:id}})
        if(!payment){
            return res.status(404).send('there is no payment with this id')
        }
        await Payment.destroy({where:{id:id}})
        res.status(200).send('the payment is deleted!!')
    }catch(err){
        res.status(500).send(err)
    }
}
const getPayment = async (req, res) => {
    try {
        let { queryStatus, queryTitle } = req.query;

        queryStatus = queryStatus ? queryStatus.toLowerCase() : '';

        const whereCondition = {};

        if (queryStatus && !['Oncasement','Decasement'].includes(queryStatus)) {
            return res.status(400).json({ error: "QueryStatus must be 'active' or 'expired'" });
        }

        if (queryStatus) {
            whereCondition.status = queryStatus;
        }

        if (queryTitle && typeof queryTitle === 'string' && queryTitle.trim() !== '') {
            whereCondition[Op.and] = [
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('paymentTitle')), {
                    [Op.like]: `%${queryTitle.toLowerCase()}%`
                })
            ];
        }
        

        const payments = await Payment.findAll({
            where: whereCondition,
        });

        return res.status(200).json(payments);
    } catch (err) {
        console.error("Error in getProgrammes:", err);
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }};
    module.exports = {
        addpayment,
        getPayment,
        getall,
        updatepayment,
        deletePayment
    }