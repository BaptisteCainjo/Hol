import { useState } from "react";
import BoutonWithPoint from "../ButtonWithPoint/ButtonWithPoint.jsx";
import BoutonSubmitWithPoint from "../ButtonSubmitWithPoint/ButtonSubmitWithPoint.jsx";
import PopupConnexionStyle from "./PopupConnexion.module.scss";
import { LuX } from "react-icons/lu";
import InscriptionForm from "../InscriptionForm/InscriptionForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userAction.js";
import axios from "../../utils/net.js";

const PopupConnexion = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isInscriptionMode, setIsInscriptionMode] = useState(false);
  const [inscriptionType, setInscriptionType] = useState(""); // type d'inscription : client ou artisan
  const [previousStep, setPreviousStep] = useState(""); // Ajout d'un état pour suivre l'étape précédente
  const [errorMessage, setErrorMessage] = useState("");

  const toggleMode = () => {
    setIsInscriptionMode(!isInscriptionMode);
  };

  const handleInscriptionTypeChange = (type) => {
    setInscriptionType(type);
  };

  const handleGoBack = () => {
    // Fonction pour revenir à l'étape précédente
    setInscriptionType("");
  };

  const handleClose = () => {
    onClose();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password)
      await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      navigate("/marketplace");
      window.location.reload();
      // navigate(0);

    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const sampleLocation = useLocation();

  return (
    <div className={`${sampleLocation.pathname === "/marketplace" ? PopupConnexionStyle.marketplace : ""}`}>
      <div className={PopupConnexionStyle.Popupbackground} onClick={handleClose}></div>
      <div className={PopupConnexionStyle.PopupContainer}>
        {/* ici si il clique sur inscription, alors changer composition de la div donnexion et mettre la composition de inscription et enlver le bloc "aucun compte ?" */}

        <div className={PopupConnexionStyle.PopupConnect}>
          <div className={PopupConnexionStyle.PopupConnectTop}>
            <h3 className={PopupConnexionStyle.PopupConnectTitle}>
              {isInscriptionMode
                ? `S'inscrire ${inscriptionType === "artisan"
                  ? "comme Artisan"
                  : inscriptionType === "client"
                    ? "comme Client"
                    : ""
                }`
                : "Se connecter"}
            </h3>
            <LuX className={PopupConnexionStyle.PopupConnectClose} onClick={handleClose}/>
          </div>

          {isInscriptionMode ? (
            <div className={PopupConnexionStyle.PopupConnectInscriptionParent}>
              {inscriptionType === "" ? (
                <div className={PopupConnexionStyle.inscriptionType}>
                  <p>Qui es-tu ?</p>
                  <div className={PopupConnexionStyle.inscriptionTypeChoice}>
                    <div className={PopupConnexionStyle.inscriptionTypeClient} onClick={() => handleInscriptionTypeChange("client")}>
                      <label>Client</label>
                    </div>

                    <div className={PopupConnexionStyle.inscriptionTypeArtisan} onClick={() => handleInscriptionTypeChange("artisan")}>
                      <label>Artisan</label>
                    </div>
                  </div>
                </div>
              ) : (
                <InscriptionForm setIsInscriptionMode={setIsInscriptionMode} type={inscriptionType} onGoBack={handleGoBack} />
              )}
            </div>
          ) : (
            // Formulaire de connexion
            <form
              className={PopupConnexionStyle.PopupConnectForm}
              onSubmit={handleSubmit}
            >
              <label className={PopupConnexionStyle.PopupConnectLabel} htmlFor="">
                Adresse e-mail
                <input
                  className={PopupConnexionStyle.PopupConnectInput}
                  type="text"
                  name="email"
                  placeholder="Écrire une adresse mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className={PopupConnexionStyle.PopupConnectLabel} htmlFor="">
                Mot de passe
                <input
                  className={PopupConnexionStyle.PopupConnectInput}
                  name="password"
                  type="password"
                  placeholder="Écrire un mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {errorMessage && <p className={PopupConnexionStyle.PopupConnectError}>{errorMessage}</p>}
              <BoutonSubmitWithPoint color={"BLACK"} text="Se connecter" />
            </form>
          )}
        </div>

        {!isInscriptionMode && (
          <div className={PopupConnexionStyle.PopupRegister}>
            <h3 className={PopupConnexionStyle.PopupRegisterTitle}>
              Aucun compte ?
            </h3>
            <p className={PopupConnexionStyle.PopupRegisterText}>
              Rejoins la communauté Holl
            </p>
            <BoutonWithPoint
              color={"ORANGE"}
              text="S'inscrire"
              onClick={toggleMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupConnexion;
