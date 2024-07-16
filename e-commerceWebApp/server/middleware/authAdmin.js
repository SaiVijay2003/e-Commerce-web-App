const Users = require('../models/userModel');

const authAdmin = async (req, res, next) => {
    try {
        console.log("Entering authAdmin middleware");
        const user = await Users.findOne({
            _id: req.user.id
        });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ msg: "User not found" });
        }

        console.log('Admin check for user:', user);

        if (user.role === 0) {
            console.log("Access denied for user with role 0");
            return res.status(400).json({ msg: "Admin Resources Access Denied" });
        }

        console.log("Admin access granted");
        next();
    } catch (err) {
        console.log("authAdmin middleware error", err);
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authAdmin;
