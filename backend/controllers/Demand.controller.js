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
        console.log("📂 Request Body:", req.body);
        console.log("📁 Uploaded Files:", req.files); // Debugging

        const { userId, programmeId, status } = req.body;
        let files = req.files || []; // Handle files correctly

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ error: "Invalid or missing userId" });
        }
        if (!programmeId || isNaN(programmeId)) {
            return res.status(400).json({ error: "Invalid or missing programmeId" });
        }

        // Ensure User and Programme exist
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const programme = await Programme.findByPk(programmeId);
        if (!programme) {
            return res.status(404).json({ error: "Programme not found" });
        }

        // Create the demand
        const demand = await Demand.create({ userId, programmeId, status });

        // 🔹 Ensure `files` is always an array
        if (!Array.isArray(files)) {
            files = [files]; // Convert single file to an array
        }

        // 🔹 Save files, if any
        if (files.length > 0) {
            const fileData = files.map((file) => ({
                demandeId: demand.id,
                name: file.originalname,
                path: `uploads/${file.filename}`
            }));

            await File.bulkCreate(fileData);
        }

        return res.status(201).json({ message: "Demand created successfully", demand });

    } catch (err) {
        console.error("❌ Error in addDemand:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message
        });
    }
};




const deletedemand = async (req, res) => {
    try {
        const { id } = req.params;

        const demand = await Demand.findOne({ where: { id } });
        if (!demand) {
            return res.status(404).json({ error: 'There is no demand with this ID' });
        }
        const files = await File.findAll({ where: { demandeId: id } });

        files.forEach((file) => {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });

        await File.destroy({ where: { demandeId: id } });

        await Demand.destroy({ where: { id } });

        return res.status(200).json({ message: 'The demand and its files are deleted successfully' });
    } catch (err) {
        console.error("Error in deletedemand:", err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};


const getall = async (req, res) => {
    try {
        const demandes = await Demand.findAll({
            include: [
                {
                    model: File,
                    attributes: ['id', 'name', 'path']
                },
                {
                    model: Programme,
                    attributes: ['title'],
                    include: [{ model: Categorie, attributes: ['CategorieName'] }]
                }
            ]
        });

        return res.status(200).json(demandes);
    } catch (err) {
        console.error("Error in getall:", err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

const updatedemand = async (req, res) => {
    try {
        const { id } = req.params;
        const { files, ...programmeData } = req.body;

        const programme = await Programme.findOne({ where: { id } });
        if (!programme) {
            return res.status(404).json({ error: 'There is no programme with this ID' });
        }

        await Programme.update(programmeData, { where: { id } });

        if (files && files.length > 0) {
            await File.destroy({ where: { demandeId: id } });

            const insertFiles = files.map((file) => ({
                demandeId: id,
                name: file.originalname,
                path: `uploads/${file.filename}`
            }));
            await File.bulkCreate(insertFiles);
        }

        return res.status(200).json({ message: 'The programme has been updated successfully' });
    } catch (err) {
        console.error("Error in updateprogramme:", err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
const getDemands = async (req, res) => {
    try {
        let {  queryCategorie, queryTitle } = req.query;


        const whereCondition = {};

        if (queryCategorie) {
            whereCondition.categorieId = queryCategorie;
        }

        if (queryTitle && typeof queryTitle === 'string' && queryTitle.trim() !== '') {
            whereCondition[Op.and] = [
                Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), {
                    [Op.like]: `%${queryTitle.toLowerCase()}%`
                })
            ];
        }
        const demandes = await Demand.findAll({
            include: [
                {
                    model: Programme,
                    where: whereCondition,
                    attributes: ['id', 'categorieId', 'title','description']
                }
            ]
        });

        return res.status(200).json(demandes);
    } catch (err) {
        console.error("Error in getdemands:", err);
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
};



module.exports = {
    addDemand,
    deletedemand,
    getall,
    updatedemand,
    getDemands
};
