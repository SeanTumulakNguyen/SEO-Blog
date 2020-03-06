import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';

const BlogRead = () => {
	const [
		blogs,
		setBlogs
	] = useState([]);
	const [
		messages,
		setMessage
	] = useState('');
	const token = getCookie('token');

	useEffect(() => {
		loadBlogs();
	}, []);

	const loadBlogs = () => {
		list().then((data) => {
			if (data.error) {
				console.log(data.error);
			}
			setBlogs(data);
		});
		return console.log(blogs);
	};

	const showAllBlogs = () => {
		return blogs.map((blog, i) => {
			return (
				<div key={i}>
					<h3>{blog.title}</h3>
					<p className="mark">
						Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
					</p>
				</div>
			);
		});
	};

	return (
		<React.Fragment>
				<div className="row">
					<div className="col-md-12">{showAllBlogs()}</div>
				</div>
		</React.Fragment>
	);
};

export default BlogRead;
