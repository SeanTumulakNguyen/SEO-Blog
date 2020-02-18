import Link from 'next/link';
import { useState, useEffect } from 'react';
import Route from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { create } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router }) => {
	const [ body, setBody ] = useState({});
	const [ values, setValues ] = useState({
		error: '',
		sizeError: '',
		success: '',
		formData: '',
		title: '',
		hidePublishButton: false
	});

	const { error, sizeError, success, formData, title, hidePublishButton } = values;

	const publishBlog = (e) => {
		e.preventDefault();
		console.log('ready to publish blog');
	};

	const handleChange = (name) => (e) => {
		console.log(e.target.value);
	};

	const handleBody = (e) => {
		console.log(e);
	};

	const blogCreateForm = () => {
		return (
			<form onSubmit={publishBlog}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input type="text" className="form-control" value={title} onChange={handleChange('title')} />
				</div>

				<div className="form-group">
					<ReactQuill value={body} placeholder="Write something amazing..." onChange={handleBody} />
				</div>

				<div>
					<button type="submit" className="btn btn-primary">
						Publish
					</button>
				</div>
			</form>
		);
	};

	return <div>{blogCreateForm()}</div>;
};

BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogCreate);
