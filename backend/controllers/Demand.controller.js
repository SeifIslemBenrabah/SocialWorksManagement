const Demand = require('../models/Demande')
const Programme = require('../models/Programme')
const User = require('../models/User')
const addDemand  = async(req,res)=>{
    try{
        const {userId,programmeId,status,conditions}  = req.body
        
        const user = User.findOne({where:{id:userId}})
        const programme = Programme.findOne({where:{id:programmeId}})
        if(!user || !programme ){
            res.status(403).send('wrong body')
        }
        const demand = await Demand.create({userId:userId,programmeId:programmeId,status:status})

        res.status(200).send('the programme created!!')
    }
    catch(err){
        res.status(500).send(err)
    }
}
const deletedemand = async(req,res)=>{
    try{
    const {id} = req.params;
    const demand = Demand.findOne({where:{id:id}})
    if(!demand){
        res.status(404).send('there is no programme with this id')
    }
    await Demand.destroy({where:{id:id}})
    res.status(200).send('the programme is deleted!!')
    }
    catch(err){
        res.status(500).send(err)
    }
}
const deleteCondition = async(req,res)=>{
    try{
        const {id} = req.params
    const condition = await Pcondition.findOne({where:{id:id}})
    if(!condition){
        res.status(404).send('there is no condition with this id')
    }
    await Pcondition.destroy({where:{id:id}})
    res.status(200).send('the condition is deleted!!')
    }catch(err){
        res.status(500).send(err)
    }
}
const getall = async(req,res)=>{
    try{
        const programmes = await Programme.findAll({
            include:[
                {
                    model:Pcondition,
                    attributes:['id','programmeId','Condition']
                },
        {
            model: Categorie, 
            attributes: ['CategorieName'] 
        }
            ]
        })
        res.status(200).send(programmes)
    }catch(err){
        res.status(500).send(err)
    }
}
const getProgrammes = async (req, res) => {
    try {
        let { queryStatus, queryCategorie, queryTitle } = req.query;

        // Convert query values to lowercase before checking
        queryStatus = queryStatus ? queryStatus.toLowerCase() : '';
        queryTitle = queryTitle ? queryTitle.toLowerCase() : '';

        // Prepare the where condition object
        const whereCondition = {};

        // Check if status query is valid ('active' or 'expired')
        if (queryStatus && !['active', 'expired'].includes(queryStatus)) {
            return res.status(400).json({ error: "QueryStatus must be 'active' or 'expired'" });
        }

        // Add status to the where condition if provided
        if (queryStatus) {
            whereCondition.status = queryStatus;
        }

        // Add categorieId to the where condition if provided
        if (queryCategorie) {
            whereCondition.categorieId = queryCategorie;
        }

        // Add title search to the where condition if provided
        if (queryTitle) {
            whereCondition.title = { [Op.like]: `%${queryTitle}%` };
        }

        // Fetch programmes based on the dynamic where condition
        const programmes = await Programme.findAll({
            where: whereCondition,
            include: [
                {
                    model: Pcondition,
                    attributes: ['id', 'programmeId', 'Condition']
                }
            ]
        });

        // If no programmes are found, return an empty array
        if (programmes.length === 0) {
            return res.status(200).json([]); // Empty array when no programmes found
        }

        // Return the fetched programmes
        res.status(200).json(programmes);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateprogramme = async(req,res)=>{
    try{
        const { id } = req.params;
    const { conditions, ...programmeData } = req.body;

    const programme = await Programme.findOne({ where: { id: id } });
    if (!programme) {
      return res.status(404).send('There is no programme with this ID');
    }
    await Programme.update(programmeData, { where: { id: id } });

    if (conditions && conditions.length > 0) {
      await Pcondition.destroy({ where: { programmeId: id } });

      const insertConditions = conditions.map((condition) => ({
        programmeId: id,
        Condition: condition,
      }));
      await Pcondition.bulkCreate(insertConditions);
    }

    res.status(200).send('The programme has been updated successfully');
    }catch(err){
        res.status(500).send(err)
    }
}
module.exports = {
    addDemand,
    deletedemand,
    deleteCondition,
    getall,
    updateprogramme,
    getProgrammes
}