import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link'
import LoginGoogle from './LoginGoogle'

const SigninComponent = () => {
	const [
		values,
		setValues
	] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	});

	const { name, email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.table({ name, email, password, error, loading, message, showForm })
		setValues({ ...values, loading: true, error: false });
		const user = { email, password };

		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				// save user token to cookie
				// save user info to localstorage
				// authenticate user
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push(`/admin`);
					}
					else {
						Router.push(`/user`);
					}
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

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
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
					<button className="btn btn-primary float-right">Signin</button>
				</div>
			</form>
		);
	};

	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			<LoginGoogle />
			{showForm && signinForm()}
			<br />
			<br />
			<Link href="/auth/password/forgot">
				<a className="btn btn-outline-danger btn-small float-right">Reset password</a>
			</Link>
		</React.Fragment>
	);
};

export default SigninComponent;
