const User = require('../models/User'); // ✅ Keep separate imports
const Account = require('../models/Account'); 
const {UserRole} = require('../models/UserRole'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, email, password, roleId } = req.body;

        if (!name || !email || !password || !roleId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const lowerEmail = email.toLowerCase();

        const user = await User.create({ fullName: name, email: lowerEmail });

        const account = await Account.create({ userId: user.id, roleId, password: hashedPassword });

        return res.status(201).json({ user, account });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error creating user" });
    }
};

const loginUser = async (req, res) => {
    try {
        const lowerEmail = req.body.email.toLowerCase();
        const user = await User.findOne({ where: { email: lowerEmail } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const accounts = await Account.findAll({ where: { userId: user.id } });

        if (accounts.length === 0) { 
            return res.status(400).json({ error: "No accounts found for this user" });
        }

        let matchedAccount = null;
        for (const account of accounts) {
            const isMatch = await bcrypt.compare(req.body.password, account.password); 
            if (isMatch) {
                matchedAccount = account;
                break;
            }
        }

        if (!matchedAccount) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        const userRole = await UserRole.findOne({ where: { id: matchedAccount.roleId } });

        if (!userRole) {
            return res.status(500).json({ error: "Role not found" });
        }

        const accessToken = jwt.sign(
            { name: user.fullName, role: userRole.roleName }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1h" }
        );

        return res.json({ accessToken, role: userRole.roleName });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Backend error: ${err.message}` });
    }
};

module.exports = {
    createUser,
    loginUser
};
