import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userAction";
import axios from "../utils/net.js";
import { SEND_EMAIL, generateFormattedUUID } from "../utils/config.js";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      lastName: e.target.lastName.value,
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      verified: false,
      verifiedByAdmin: false,
      secretKey: generateFormattedUUID(),
    };

    try {
      const response = await axios.get("http://localhost:5000/api/users");
      const allUsersEmail = response.data.map((user) => user.email);
      setEmailError("");
      setPasswordError("");

      const String_MsgErrorEmail = "Cet email est déjà utilisé";
      const String_MsgErrorPassword = "Les mots de passe ne correspondent pas";
      if (allUsersEmail.some((user) => user === formData.email)) {
        setEmailError(String_MsgErrorEmail);
        console.log("email error");
      }
      if (formData.password !== formData.confirmPassword) {
        setPasswordError(String_MsgErrorPassword);
        console.log("password error");
      } else if (
        !allUsersEmail.some((user) => user === formData.email) &&
        formData.password === formData.confirmPassword
      ) {
        dispatch(addUser(formData));
        navigate(`/verified?email=${formData.email}`);
        await axios.get(
          `${SEND_EMAIL}?lastName=${formData.lastName}&firstName=${formData.firstName}&email=${formData.email}&secretKey=${formData.secretKey}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lastName">lastName</label>
          <input type="text"  />
        </div>
        <div>
          <label htmlFor="firstName">firstName</label>
          <input type="text" name="firstName" id="firstName" required />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" required />
          <p>{emailError ? emailError : null}</p>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">confirmPassword</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />
          <p>{passwordError ? passwordError : null}</p>
        </div>
        <div>
          <input type="checkbox" name="acceptTerms" id="acceptTerms" required />
          <label htmlFor="acceptTerms">
            J'accepte les <Link to="/terms-of-use"> Conditions Générales</Link>
          </label>
        </div>
        <button type="submit">S'incrire</button>
      </form>
    </section>
  );
}
