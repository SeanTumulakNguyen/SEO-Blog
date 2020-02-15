const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Image could not upload'
			});
		}
		const { title, body, categories, tags } = fields;

		let blog = new Blog();
		blog.title = title;
		blog.body = body;
		blog.slug = slugify(title).toLowerCase();
		blog.mtitle = `${title} | ${process.env.APP_NAME}`;
		blog.mdescription = stripHtml(body.substring(0, 160));
		blog.postedBy = req.user._id;
	});
};
