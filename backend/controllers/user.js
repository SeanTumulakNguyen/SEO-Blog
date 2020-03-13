const User = require('../models/user')

exports.read = (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(req.profile);
};

exports.publicProfile = (req, res) => {
	username = req.params.username
	User.findOne({})
}
