const fs = require('fs');
const path = require('path');
const MeetingPv = require('../models/MeetingPv');
const Meet = require('../models/Meet');

const UPLOADS_DIR = path.resolve(__dirname, '../uploads');

const safeFilePath = (relativePath) => {
  const resolved = path.resolve(__dirname, '../', relativePath);
  if (!resolved.startsWith(UPLOADS_DIR)) return null;
  return resolved;
};

const createMeetingPv = async (req, res) => {
  try {
    const { meetingId, name } = req.body;
    const pvPath = req.file ? `uploads/${req.file.filename}` : null;

    if (!meetingId) {
      return res.status(400).json({ message: 'meetingId is required' });
    }

    const meet = await Meet.findOne({ where: { id: meetingId } });
    if (!meet) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    let pv = await MeetingPv.findOne({ where: { meetingPvId: meetingId } });

    if (pv) {
      if (pv.path) {
        const existing = safeFilePath(pv.path);
        if (existing && fs.existsSync(existing)) fs.unlinkSync(existing);
      }
      await pv.update({ name, path: pvPath });
      return res.status(200).json({ message: 'PV updated successfully', pv });
    }

    pv = await MeetingPv.create({ name, meetingPvId: meetingId, path: pvPath });
    return res.status(201).json({ message: 'PV created', pv });
  } catch (err) {
    console.error('Error in createMeetingPv:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getPv = async (req, res) => {
  try {
    const { id } = req.params;
    const pv = await MeetingPv.findOne({ where: { id } });

    if (!pv) {
      return res.status(404).json({ message: 'PV not found' });
    }

    const pvPath = safeFilePath(pv.path);
    if (!pvPath) {
      return res.status(400).json({ message: 'Invalid file path' });
    }

    if (!fs.existsSync(pvPath)) {
      return res.status(404).json({ message: 'File no longer exists on disk' });
    }

    return res.sendFile(pvPath, (err) => {
      if (err) return res.status(500).json({ message: 'Error sending the file' });
    });
  } catch (err) {
    console.error('Error in getPv:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePv = async (req, res) => {
  try {
    const { id } = req.params;
    const pv = await MeetingPv.findOne({ where: { id } });

    if (!pv) {
      return res.status(404).json({ message: 'PV not found' });
    }

    await MeetingPv.update(req.body, { where: { id } });
    return res.status(200).json({ message: 'PV updated successfully' });
  } catch (err) {
    console.error('Error in updatePv:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePv = async (req, res) => {
  try {
    const { id } = req.params;
    const pv = await MeetingPv.findOne({ where: { id } });

    if (!pv) {
      return res.status(404).json({ message: 'PV not found' });
    }

    if (pv.path) {
      const pvPath = safeFilePath(pv.path);
      if (pvPath && fs.existsSync(pvPath)) fs.unlinkSync(pvPath);
    }

    await pv.destroy();
    return res.status(200).json({ message: 'PV deleted successfully' });
  } catch (err) {
    console.error('Error in deletePv:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createMeetingPv, getPv, updatePv, deletePv };
