const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const Demand = require('../models/Demande');

// ✅ Ajouter un fichier
const createfile = async (req, res) => {
    try {
        const { demandeId, name } = req.body;
        const filePath = req.file ? `uploads/${req.file.filename}` : null;

        if (!demandeId) {
            return res.status(400).json({ msg: "Need the demand ID!" });
        }

        const demand = await Demand.findOne({ where: { id: demandeId } });

        if (!demand) {
            return res.status(404).json({ msg: "There is no demand with this ID!" });
        }

        const file = await File.create({ name, demandeId, path: filePath });

        return res.status(201).json({ msg: "File is created!", file });
    } catch (err) {
        console.error("Error in createfile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

// ✅ Récupérer un fichier
const getfile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findOne({ where: { id } });

        if (!file) {
            return res.status(404).json({ msg: "File not found" });
        }

        const filePath = path.join(__dirname, "../", file.path);
        
        res.set({
            'Content-Type': 'multipart/form-data',
            'X-Custom-Header': 'CustomHeaderValue',
        });

        return res.sendFile(filePath, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Error sending the file." });
            }
        });
    } catch (err) {
        console.error("Error in getfile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

// ✅ Mettre à jour un fichier
const updatefile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findOne({ where: { id } });

        if (!file) {
            return res.status(404).json({ msg: "There is no file with this ID" });
        }

        await File.update(req.body, { where: { id } });

        return res.status(200).json({ msg: "The file is updated successfully" });
    } catch (err) {
        console.error("Error in updatefile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

// ✅ Supprimer un fichier
const deletefile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findOne({ where: { id } });

        if (!file) {
            return res.status(404).json({ msg: "There is no file with this ID" });
        }

        // Supprimer le fichier physique
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        await file.destroy();
        return res.status(200).json({ msg: "The file is deleted successfully" });
    } catch (err) {
        console.error("Error in deletefile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    createfile,
    getfile,
    updatefile,
    deletefile
};
