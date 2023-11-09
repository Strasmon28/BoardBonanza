import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push("/boards");
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();

    return dispatch(login("demo@aa.io", "password")).then(() => {
      closeModal();
      history.push("/boards");
    });
  };

  return (
    <div className="login-modal">
      <h1 className="login-title">Log In</h1>
        <div className="login-error-container">
          {errors.map((error, idx) => (
            <p className="login-error" key={idx}>{error}</p>
          ))}
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
        <div className="email-container">
        <label>
          Email
        </label>
          <input
            type="email"
            className="profile-login-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>
        <div className="password-container">
        <label>
          Password
        </label>
          <input
            type="password"
            className="profile-login-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="profile-login-button" type="submit">Log In</button>
        <button className="profile-login-button" onClick={handleDemoUser}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
