import React, { useEffect, useState } from "react";
import BoutonWithPoint from "../ButtonWithPoint/ButtonWithPoint.jsx";
import InscriptionFormSecretKeyStyle from "./InscriptionFormSecretKey.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MODIF_SECRETKEY,
  REGISTER__TIME_AFTER_MAIL,
  RESEND_EMAIL,
  SEND_EMAIL,
  SEND_EMAIL_TO_COMPANY,
  VERIF_UPDATE,
  VERIF_USERS,
  generateFormattedUUID,
} from "../../utils/config.js";
import axios from "../../utils/net.js";
import { LuWand2 } from "react-icons/lu";

const InscriptionFormSecretKey = ({ type, onGoBack, setIsInscriptionMode }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userEmail = queryParams.get("email");
  const [verifNumber, setVerifNumber] = useState("");
  const [msgVerif, setMsgVerif] = useState();
  const [seconds, setSeconds] = useState(REGISTER__TIME_AFTER_MAIL);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const handleVerification = async () => {
    try {
      const userResponse = await axios.get(VERIF_USERS, {
        params: {
          email: userEmail,
        },
      });

      console.log(userResponse)

      if (userResponse.data.secretKey === verifNumber) {
        await axios.post(VERIF_UPDATE, {
          email: userEmail,
          verified: true,
        });
        setMsgVerif("Le numéro de vérification est correct. Veuillez vous connecter...");
        // setIsInscriptionMode(false);

        try {
          const test = await axios.get(
            `${SEND_EMAIL_TO_COMPANY}?lastName=${userResponse.data.lastName}&firstName=${userResponse.data.firstName}&email=${userResponse.data.email}&createdAt=${userResponse.data.createdAt}&shopName=${userResponse.data.shopName}&shopAddress=${userResponse.data.shopAddress.street}&shopIban=${userResponse.data.shopIban}&shopSiret=${userResponse.data.shopSiret}&shopTel=${userResponse.data.shopTel}`
          );
          console.log(test);
        } catch (error) {
          console.error(error)
        }
        // dispatch(isOpenPopupConnexion());
      } else {
        setMsgVerif("Le numéro de vérification est incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification", error);
    }
  };

  const handleSendBack = async () => {
    if (seconds === 0) {
      setSeconds(REGISTER__TIME_AFTER_MAIL);
      try {
        const userResponse = await axios.get(VERIF_USERS, {
          params: {
            email: userEmail,
          },
        });
        const newSecretKey = generateFormattedUUID();
        await axios.get(
          `${RESEND_EMAIL}?lastName=${userResponse.data.lastName}&firstName=${userResponse.data.firstName}&email=${userResponse.data.email}&secretKey=${newSecretKey}`
        );
        await axios.put(
          `${MODIF_SECRETKEY}?email=${userResponse.data.email}&secretKey=${newSecretKey}`,
          {
            email: userEmail,
            secretKey: newSecretKey,
          }
        );
      } catch (error) {
        console.error("Erreur lors de la connexion", error);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <p className={InscriptionFormSecretKeyStyle.sentence}>C'est presque terminé <LuWand2 /></p>
      <p
        className={
          InscriptionFormSecretKeyStyle.inscriptionFormMailDestinataire
        }
      >
        Tu as reçun mail de confirmation à ton adresse <span className="email">{userEmail}</span> !
      </p>
      <p className={InscriptionFormSecretKeyStyle.inscriptionFormMailTime}>
        Vous avez <span>10 minutes</span> pour valider votre compte !
      </p>
      <p
        className={InscriptionFormSecretKeyStyle.inscriptionFormMailTimeRemain}
      >
        Temps restant : <span>{formatTime(seconds)}</span>
      </p>
      <Link
        to={`?email=${userEmail}`}
        onClick={handleSendBack}
        className={`${
          seconds !== 0
            ? InscriptionFormSecretKeyStyle.inscriptionFormMailTimeFinished
            : InscriptionFormSecretKeyStyle.inscriptionFormMailLinkValidate ||
              ""
        }`}
      >
        Renvoyer le lien de validation
      </Link>

      <form
        onSubmit={handleFormSubmit}
        className={InscriptionFormSecretKeyStyle.inscriptionForm}
      >
        <label>
          Entrer le code de validation
          <input
            type="text"
            onChange={(e) => setVerifNumber(e.target.value)}
            required
          />
          {msgVerif}
        </label>

        <BoutonWithPoint
          color={"BLACK"}
          text="Vérifier"
          onClick={handleVerification}
        />
      </form>
    </div>
  );
};

export default InscriptionFormSecretKey;
