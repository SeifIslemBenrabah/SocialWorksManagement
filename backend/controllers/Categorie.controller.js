const Categorie = require('../models/Categorie')

const addCat = async(req,res)=>{
    try{
        const {CategorieName} = req.body;
        if(!CategorieName){
            return res.status(400).send('need name to create the new cat')
        }
        const categorie = await Categorie.create({CategorieName:CategorieName});
        res.status(203).send('the cat is created!!')
    }catch(err){
        res.status(500).send(err)
    }
}
const deleteCat = async(req,res)=>{
    try{
        const {id} = req.params;
        const cat = Categorie.findOne({where:{id:id}})
        if(!cat){
            res.status(404).send('there is no cat with this id')
        }
        await Categorie.destroy({where:{id:id}})
        res.status(200).send('the cat is deleted!!')
    }catch(err){
        res.status(500).send(err)
    }
}
const getall = async(req,res)=>{
    try{
        const cats = await Categorie.findAll()
        res.status(200).send(cats)
    }
    catch(err){
        res.status(500).send(err)
    }
}
const updatecat = async(req,res)=>{
    try{
        const {id} = req.params
        const {CategorieName} = req.body
        const cat = await Categorie.findOne({where:{id:id}})
        if(!cat || !CategorieName){
            res.status(404).send('there is no cat with this id or there is no CategorieName send in the req')
        }
        await Categorie.update({CategorieName:CategorieName},{where:{id:id}})
        res.status(200).send('update')
    }catch(err){
        res.status(500).send(err)
    }
}
module.exports ={
    addCat,
    deleteCat,
    getall,
    updatecat
}