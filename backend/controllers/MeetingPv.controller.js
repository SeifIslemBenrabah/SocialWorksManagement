const fs = require('fs');
const path = require('path');
const MeetingPv = require('../models/MeetingPv');
const Meet = require('../models/Meet');

// ✅ Ajouter un pv
const createMeetingPv = async (req, res) => {
    try {
        const { meetingId, name } = req.body;
        const pvPath = req.file ? `uploads/${req.file.filename}` : null;

        if (!meetingId) {
            return res.status(400).json({ msg: "Need the Meet ID!" });
        }

        const meet = await Meet.findOne({ where: { id: meetingId } });

        if (!meet) {
            return res.status(404).json({ msg: "There is no demand with this ID!" });
        }

        // Check if a PV already exists for this meeting
        let pv = await MeetingPv.findOne({ where: { meetingPvId: meetingId } });

        if (pv) {
            // Delete old file if exists
            if (pv.path && fs.existsSync(pv.path)) {
                fs.unlinkSync(pv.path);
            }

            // Update existing record
            await pv.update({ name, path: pvPath });
            return res.status(200).json({ msg: "PV updated successfully!", pv });
        }

        // Create a new PV if not found
        pv = await MeetingPv.create({ name, meetingPvId: meetingId, path: pvPath });

        return res.status(201).json({ msg: "PV is created!", pv });
    } catch (err) {
        console.error("Error in createfile:", err);
        return res.status(500).json({ msg: err.message });
    }
};


// ✅ Récupérer un pv
const getPv = async (req, res) => {
    try {
        const { id } = req.params;
        const pv = await MeetingPv.findOne({ where: { id:id } });

        if (!pv) {
            return res.status(404).json({ msg: "File not found" });
        }

        const pvPath = path.join(__dirname, "../", pv.path);
        
        res.set({
            'Content-Type': 'multipart/form-data',
            'X-Custom-Header': 'CustomHeaderValue',
        });

        return res.sendFile(pvPath, (err) => {
            if (err) {
                return res.status(500).json({ msg: "Error sending the file." });
            }
        });
    } catch (err) {
        console.error("Error in getfile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

// ✅ Mettre à jour un pv
const updatePv = async (req, res) => {
    try {
        const { id } = req.params;
        const pv = await MeetingPv.findOne({ where: { id:id } });

        if (!pv) {
            return res.status(404).json({ msg: "There is no pv with this ID" });
        }

        await MeetingPv.update(req.body, { where: { id:id } });

        return res.status(200).json({ msg: "The pv is updated successfully" });
    } catch (err) {
        console.error("Error in updatefile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

// ✅ Supprimer un pv
const deletePv = async (req, res) => {
    try {
        const { id } = req.params;
        const pv = await MeetingPv.findOne({ where: { id:id } });

        if (!pv) {
            return res.status(404).json({ msg: "There is no pv with this ID" });
        }

       // Delete the physical file if it exists
       if (pv.path && fs.existsSync(pv.path)) {
        fs.unlinkSync(pv.path);
    }

        await pv.destroy();
        return res.status(200).json({ msg: "The pv is deleted successfully" });
    } catch (err) {
        console.error("Error in deletefile:", err);
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    createMeetingPv,
    getPv,
    updatePv,
    deletePv
};
