const SignupComponent = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('handle submit');
	};
	const handleChange = (e) => {
		console.log(e.target.value);
	};

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input onChange={handleChange} className="form-control" type="text" placeholder="Type your name" />
				</div>
			</form>
		);
	};

	return <React.Fragment>{signupForm()}</React.Fragment>;
};

export default SignupComponent;
