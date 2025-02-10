const Account = require('../models/Account')
const Meet = require('../models/Meet')
const {UserRole} = require('../models/UserRole')
const User =require('../models/User')
const { Op, Sequelize } = require('sequelize')
const createMeet = async(req,res)=>{
    try{
        const {name,date,time,meetmembers} = req.body
        if(!name || !date || !time || !meetmembers){
            res.status(403).send('wrong body')
        }
        const meet  = await Meet.create({name:name,date:date,time:time})
        const validAccounts = await Account.findAll({
            where: { id: meetmembers },
            include: {
                model: UserRole,
                where: { id: [3, 4, 5, 6] }, 
            },
        });
        if (validAccounts.length === 0) {
            return res.status(200).json({ error: "Meeting created but No valid committee members found to add to the meeting." },meet);
        }
        await meet.addAccounts(validAccounts);
        return res.status(201).json({ message: "Meeting created successfully", meet });
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const getMeets = async (req, res) => {
    try {
        const meets = await Meet.findAll({
            include: [
                {
                    model: Account,
                    attributes:['userId','roleId'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'fullName', 'email']
                        },
                        {
                            model: UserRole,
                            attributes: ['id', 'roleName']
                        }
                    ],
                    where: { roleId: [3, 4, 5, 6] } // 🔴 Possible issue
                }
            ]
        });
        
        if (!meets.length) {
            return res.status(404).json({ message: "No meetings found." });
        }

        return res.status(200).json(meets);

    } catch (err) {
        console.error("Error fetching meetings:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};
const getMembers = async(req,res) =>{
    try{
        const members= await Account.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: User,
                    attributes: ['id', 'fullName', 'email']
                }
            ],
            where: { roleId: [3, 4, 5, 6] }
        })
        res.status(200).json(members)
    }
    catch(err){
        res.status(500).json(err)
    }
}
const getById = async(req,res)=>{
    try{
        const {id} = req.params;
        const meet  = await Meet.findOne({
            where:{id:id},
            include: [
                {
                    model: Account,
                    attributes:['userId','roleId'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'fullName', 'email']
                        },
                        {
                            model: UserRole,
                            attributes: ['id', 'roleName']
                        }
                    ],
                    where: { roleId: [3, 4, 5, 6] } // 🔴 Possible issue
                }
            ]
        })
        if(!meet){
            return res.status(404).send('there is no meet with this id')
        }
        return res.status(200).json(meet)
    }catch(err){
        res.status(500).json(err)
    }
}
const getByName = async(req,res)=>{
    try{
        let {queryName}=req.query;
        const whereCondition = {};
        if(queryName && typeof queryName === 'string' && queryName.trim() !== ''){
            whereCondition[Op.and] = [
                Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('name')),{
                    [Op.like]:`%${queryName.toLowerCase()}%`
                })
            ]
        }
        const meets = await Meet.findAll({
            where: whereCondition,
            include: [
                {
                    model: Account,
                    attributes:['userId','roleId'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'fullName', 'email']
                        },
                        {
                            model: UserRole,
                            attributes: ['id', 'roleName']
                        }
                    ],
                    where: { roleId: [3, 4, 5, 6] } // 🔴 Possible issue
                }
            ]
        })
        if(!meets){
            return res.status(200).json([])
        }
        return res.status(200).json(meets)
    }
    catch(err){
        res.status(500).send(err)
    }
}
module.exports = { 
    createMeet,
    getMeets,
    getMembers,
    getById,
    getByName
  };