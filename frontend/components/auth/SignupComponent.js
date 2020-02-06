import { useState } from 'react'

const SignupComponent = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	})

	const { name, email, password, error, loading, message, showForm } = values

	const handleSubmit = (e) => {
		e.preventDefault();
		console.table({ name, email, password, error, loading, message, showForm })
	};
	const handleChange = name => e => {
		setValues({...values, error: false, [name]: e.target.value})
	};

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input onChange={handleChange('name')} value={name}className="form-control" type="text" placeholder="Type your name" />
				</div>
				<div className="form-group">
					<input onChange={handleChange('email')} value={email} className="form-control" type="email" placeholder="Type your email" />
				</div>
				<div className="form-group">
					<input onChange={handleChange('password')} value={password} className="form-control" type="password" placeholder="Type your password" />
				</div>
				<div>
					<button className="btn btn-primary">Signup</button>
				</div>
			</form>
		);
	};

	return <React.Fragment>{signupForm()}</React.Fragment>;
};

export default SignupComponent;
