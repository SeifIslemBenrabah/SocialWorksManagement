const File = require('../models/File')
const Demand = require('../models/Demande')
const path = require('path');
//add
const createfile = async (req, res) => {
    try {
        const { DemandId, name } = req.body;
        const Path = req.file ? 'uploads/' + req.file.filename : null; 
        if (!DemandId) {
            return res.status(400).json({ msg: "Need the chapiter ID!" });
        }

        const demand = await Demand.findOne({
            where: { id: DemandId },
        });

        if (!demand) {
            return res.status(400).json({ msg: "There is no chapiter with this ID!" });
        }

        const file = await File.create({ name, DemandId, Path });

        res.status(200).json({ msg: "Fiche is created!", file });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

  
//get
const getfile = async(req,res)=>{
    try{
        const {id} = req.params
        const file = await File.findOne({
            where:{
                id : id
            }})
            res.set({
               'Content-Type': 'multipart/form-data', 
                'X-Custom-Header': 'CustomHeaderValue', 
            });
            const filePath = path.join('C:/Users/admin/Desktop/DEV/e-learning/backend/',fiche.pdfPath);
            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(500).json({ msg: "Error sending the file." });
                }
            });
    }
    catch(err){
        res.status(500).json(err)
    }
}
const updatefile = async(req,res)=>{
    try{
        const {id} =req.params
        const file = await File.findOne({
            where:{
                id:id
            }
        })
        if(!file){
            res.status(404).json({msg:"there is no file with this id"})
        }
        await File.set(req.body)
        res.status(200).json({msg:"the fiche is updated"})
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
const deletefile = async(req,res)=>{
    try{
        const {id} = req.params
        const file = await File.findOne({
            where:{id: id}
        })
        if(!file){
            res.status(404).json({msg:"there is no file with this id"})
        }
        await file.destroy();
        res.status(200).json({msg:"the fiche is deleted"})
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
module.exports = {
    createfile,
    updatefile,
    deletefile,
    getfile
}