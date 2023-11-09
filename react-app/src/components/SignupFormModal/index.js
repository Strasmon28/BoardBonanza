import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, first_name, last_name));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-container">
			<h1 className="signup-title">Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<div className="signup-errors">
					{errors.map((error, idx) => (
						<div key={idx}>{error}</div>
					))}
				</div>
				<div className="signup-fields">
				<label>
					Email
				</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

				<label>
					Username
				</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>

				<label>
					First Name
				</label>
					<input
						type="text"
						value={first_name}
						onChange={(e) => setFirst_name(e.target.value)}
						required
					/>

				<label>
					Last Name
				</label>
					<input
						type="text"
						value={last_name}
						onChange={(e) => setLast_name(e.target.value)}
						required
					/>

				<label>
					Password
				</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

				<label>
					Confirm Password
				</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

				</div>
				<button className="signup-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
