import React, { useState } from "react";
import ButtonSubmitWithPoint from "../ButtonSubmitWithPoint/ButtonSubmitWithPoint.jsx";
import InscriptionFormStyle from "./InscriptionForm.module.scss";
import { LuArrowLeft } from "react-icons/lu";
import InscriptionFormArtisanBoutique from "../InscriptionFormArtisanBoutique/InscriptionFormArtisanBoutique";
import InscriptionFromSecretKey from "../InscriptionFormSecretKey/InscriptionFormSecretKey";
import {
  API_USERS,
  SEND_EMAIL,
  generateFormattedUUID,
} from "../../utils/config.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/net.js";
import { addUser } from "../../features/user/userAction.js";
import { startEdit } from "../../features/user/userSlice.js";
import Joi from "joi";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const InscriptionForm = ({ type, onGoBack, setIsInscriptionMode }) => {
  const [isNextStep, setIsNextStep] = useState(false);
  const [goToValidate, setgoToValidate] = useState(false);
  const [lastNameError, setLastNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    secretKey: generateFormattedUUID(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (email) => {
    dispatch(startEdit(email));
    setEmailValue(email);
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: email,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let verifiedByAdmin;
    let role;
    type === "artisan"
      ? (verifiedByAdmin = false)
      : (verifiedByAdmin = undefined);
      
    if (type === "artisan") {
      setIsNextStep(true);
      verifiedByAdmin = false;
      role = "artisan";
    } else {
      verifiedByAdmin = undefined;
      role = "user";
      setgoToValidate(true);
    }

    const formSubmissionData = {
      lastName: e.target.lastName.value,
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      role: role,
      verifiedByAdmin: verifiedByAdmin,
      secretKey: formData.secretKey,
    };

    const String_Error = "Le champ {#label}";
    const String_ErrorBase = `${String_Error} doit être un type "texte"`;
    const String_ErrorEmpty = `${String_Error} ne peut pas être vide`;
    const String_ErrorRequired = `${String_Error} est obligatoire`;
    const String_ErrorMin = `${String_Error} doit avoir une longueur minimale de {#limit} caracteres`;
    const String_ErrorMax = `${String_Error} doit avoir une longueur maximale de {#limit} caracteres`;
    const String_ErrorRegexLastFirstName = `${String_Error} doit être une chaîne de caractères valide`;
    const String_ErrorEmail = `${String_Error} doit contenir une adresse email et un domaine valide (yyy@zzz.fr). `;
    const String_ErrorPassword = `${String_Error} doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (@, $, !, %, *, ?, &)`;
    const String_ErrorConfirmPassword = `Les mots de passe ne correspondent pas`;

    const commonMessages = (label) => ({
      "string.base": String_ErrorBase.replace("{#label}", label),
      "string.empty": String_ErrorEmpty.replace("{#label}", label),
      "any.required": String_ErrorRequired.replace("{#label}", label),
      "string.min": String_ErrorMin.replace("{#label}", label),
      "string.max": String_ErrorMax.replace("{#label}", label),
    });

    const schema = Joi.object({
      lastName: Joi.string()
        .regex(/^[a-zA-ZÀ-ÿ\s']+$/)
        .min(3)
        .max(30)
        .required()
        .messages({
          ...commonMessages("Nom"),
          "string.pattern.base": String_ErrorRegexLastFirstName.replace(
            "{#label}",
            "Nom"
          ),
        }),

      firstName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          ...commonMessages("Prénom"),
          "string.pattern.base": String_ErrorRegexLastFirstName.replace(
            "{#label}",
            "Prénom"
          ),
        }),

      email: Joi.string()
        .email(
          { tlds: { allow: ["com", "net", "org", "fr", "eu"] } },
          { minDomainSegments: 2 }
        )
        .max(254)
        .trim()
        .lowercase()
        .required()
        .messages({
          ...commonMessages("Adresse mail"),
          "string.email": String_ErrorEmail.replace("{#label}", "Adresse mail"),
        }),

      password: Joi.string()
        .min(8)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .required()
        .messages({
          ...commonMessages("Mot de passe"),
          "string.pattern.base": String_ErrorPassword.replace(
            "{#label}",
            "Mot de passe"
          ),
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": String_ErrorConfirmPassword }),
      role: Joi.string().valid("user", "artisan").required(),
      verifiedByAdmin: Joi.boolean(),
      secretKey: Joi.string().required(),
    });

    const { error } = schema.validate(formSubmissionData);
    console.log(schema.validate(formSubmissionData));
    if (error) {
      setIsNextStep(false)
      setEmailError("");
      setPasswordError("");
      setPasswordConfirmError("");
      setLastNameError("");
      setFirstNameError("");

      error.details.forEach((detail) => {
        if (detail.path[0] === "lastName") {
          setLastNameError(detail.message);
        } else if (detail.path[0] === "firstName") {
          setFirstNameError(detail.message);
        } else if (detail.path[0] === "email") {
          setEmailError(detail.message);
        } else if (detail.path[0] === "password") {
          setPasswordError(detail.message);
        } else if (detail.path[0] === "confirmPassword") {
          setPasswordConfirmError(detail.message);
        }
      });
      setgoToValidate(false);
      return;
    }

    try {
      console.log(type);
      const response = await axios.get(API_USERS);
      const allUsersEmail = response.data.map((user) => user.email);
      setEmailError("");
      setPasswordConfirmError("");

      const String_MsgErrorEmail = "Cet email est déjà utilisé";
      const String_MsgErrorPassword = "Les mots de passe ne correspondent pas";
      if (allUsersEmail.some((user) => user === formSubmissionData.email)) {
        setEmailError(String_MsgErrorEmail);
        setgoToValidate(false);
      }
      if (formSubmissionData.password !== formSubmissionData.confirmPassword) {
        setPasswordConfirmError(String_MsgErrorPassword);
        setgoToValidate(false);
      } else if (
        !allUsersEmail.some((user) => user === formSubmissionData.email) &&
        formSubmissionData.password === formSubmissionData.confirmPassword
      ) {
        dispatch(addUser(formSubmissionData));
        navigate(`?email=${formSubmissionData.email}`);
        if (formSubmissionData.role === "user") {
          await axios.get(
            `${SEND_EMAIL}?lastName=${formSubmissionData.lastName}&firstName=${formSubmissionData.firstName}&email=${formSubmissionData.email}&secretKey=${formSubmissionData.secretKey}`
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    isNextStep ? setIsNextStep(false) : onGoBack();
  };

  return (
    <div className={InscriptionFormStyle.inscriptionContainer}>
      <button
        className={InscriptionFormStyle.inscriptionFormBtnBack}
        onClick={handleGoBack}
      >
        <LuArrowLeft />
        Retour
      </button>
      {!isNextStep && !goToValidate ? (
        <form
          onSubmit={handleFormSubmit}
          className={InscriptionFormStyle.inscriptionForm}
        >
          <label htmlFor="lastName">
            Nom
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Écrire un nom"
            />
            <p className={InscriptionFormStyle.messageError}>{lastNameError}</p>
          </label>

          <label htmlFor="firstName">
            Prénom
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Écrire un prénom"
            />
            <p className={InscriptionFormStyle.messageError}>
              {firstNameError}
            </p>
          </label>

          <label htmlFor="email">
            Adresse mail
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                handleEdit(e.target.value);
              }}
              required
              placeholder="Écrire une adresse mail"
            />
            <p className={InscriptionFormStyle.messageError}>{emailError}</p>
          </label>

          <label htmlFor="password">
            Mot de passe
            <input
              type="password"
              name="password"
              required
              placeholder="Écrire un mot de passe"
            />
            <p className={InscriptionFormStyle.messageError}>{passwordError}</p>
          </label>

          <label htmlFor="confirmPassword">
            Confirmation mot de passe
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Écrire un mot de passe"
            />
            <p className={InscriptionFormStyle.messageError}>
              {passwordConfirmError}
            </p>
          </label>

          <label
            htmlFor="acceptTerms"
            className={InscriptionFormStyle.termsUse}
          >
            J'accepte les{" "}
            <Link
              onClick={scrollToTop}
              className={InscriptionFormStyle.termsUseLink}
              to="/confidentialite-de-vente"
            >
              {" "}
              Conditions Générales
            </Link>
            <input type="checkbox" name="acceptTerms" required />
          </label>

          <ButtonSubmitWithPoint
            color={"BLACK"}
            text={type === "artisan" ? "Étape suivante" : "S'inscrire"}
          />
        </form>
      ) : goToValidate ? (
        <InscriptionFromSecretKey setIsInscriptionMode={setIsInscriptionMode} />
      ) : (
        type === "artisan" && <InscriptionFormArtisanBoutique {...formData} />
      )}
    </div>
  );
};

export default InscriptionForm;
