import { useState } from 'react';
import { signup } from '../../actions/auth';

const SignupComponent = () => {
	const [
		values,
		setValues
	] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	});

	const { name, email, password, error, loading, message, showForm } = values;

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.table({ name, email, password, error, loading, message, showForm })
		setValues({ ...values, loading: true, error: false });
		const user = { name, email, password };

		signup(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					loading: false,
					message: data.message,
					showForm: false
				});
			}
		});
	};
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
	const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						onChange={handleChange('name')}
						value={name}
						className="form-control"
						type="text"
						placeholder="Type your name"
					/>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange('email')}
						value={email}
						className="form-control"
						type="email"
						placeholder="Type your email"
					/>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange('password')}
						value={password}
						className="form-control"
						type="password"
						placeholder="Type your password"
					/>
				</div>
				<div>
					<button className="btn btn-primary float-right">Signup</button>
				</div>
			</form>
		);
	};

	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
		</React.Fragment>
	);
};

export default SignupComponent;