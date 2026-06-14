const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const Demand = require('../models/Demande');

const UPLOADS_DIR = path.resolve(__dirname, '../uploads');

const safeFilePath = (relativePath) => {
  const resolved = path.resolve(__dirname, '../', relativePath);
  if (!resolved.startsWith(UPLOADS_DIR)) {
    return null;
  }
  return resolved;
};

const createfile = async (req, res) => {
  try {
    const { demandeId, name } = req.body;
    const filePath = req.file ? `uploads/${req.file.filename}` : null;

    if (!demandeId) {
      return res.status(400).json({ message: 'demandeId is required' });
    }

    const demand = await Demand.findOne({ where: { id: demandeId } });
    if (!demand) {
      return res.status(404).json({ message: 'Demand not found' });
    }

    const file = await File.create({ name, demandeId, path: filePath });
    return res.status(201).json({ message: 'File created', file });
  } catch (err) {
    console.error('Error in createfile:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getfile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({ where: { id } });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = safeFilePath(file.path);
    if (!filePath) {
      return res.status(400).json({ message: 'Invalid file path' });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File no longer exists on disk' });
    }

    return res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending the file' });
      }
    });
  } catch (err) {
    console.error('Error in getfile:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatefile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({ where: { id } });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    await File.update(req.body, { where: { id } });
    return res.status(200).json({ message: 'File updated successfully' });
  } catch (err) {
    console.error('Error in updatefile:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletefile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({ where: { id } });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (file.path) {
      const filePath = safeFilePath(file.path);
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await file.destroy();
    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Error in deletefile:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createfile, getfile, updatefile, deletefile };
