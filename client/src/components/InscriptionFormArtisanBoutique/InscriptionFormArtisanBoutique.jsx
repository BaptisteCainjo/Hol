import React, { useState } from "react";
import ButtonSubmitWithPoint from "../ButtonSubmitWithPoint/ButtonSubmitWithPoint.jsx";
import InscriptionFormArtisanBoutiqueStyle from "./InscriptionFormArtisanBoutique.module.scss";
import { useDispatch } from "react-redux";
import { updateArtisan } from "../../features/user/userAction.js";
import { addShop } from "../../features/shop/shopAction.js";
import InscriptionFormSecretKey from "../InscriptionFormSecretKey/InscriptionFormSecretKey.jsx";
import axios from "../../utils/net.js";
import { SEND_EMAIL_TO_ARTISAN } from "../../utils/config.js";
import Joi from "joi";

const InscriptionFormArtisanBoutique = ({
  lastName,
  firstName,
  email,
  secretKey,
}) => {
  const dispatch = useDispatch();
  const [goToValidate, setgoToValidate] = useState(false);
  const [shopNameError, setShopNameError] = useState("");
  const [shopAddressError, setShopAddressError] = useState("");
  const [shopTelError, setShopTelError] = useState("");
  const [shopIbanError, setShopIbanError] = useState("");
  const [shopSiretError, setShopSiretError] = useState("");

  const [formData, setFormData] = useState({
    shopName: "",
    shopAddress: "",
    shopTel: "",
    shopIban: "",
    shopSiret: "",
    lastName: lastName,
    firstName: firstName,
    email: email,
    secretKey: secretKey,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setgoToValidate(true);

    const String_Error = "Le champ {#label}";
    const String_ErrorBase = `${String_Error} doit être un type "texte"`;
    const String_ErrorEmpty = `${String_Error} ne peut pas être vide`;
    const String_ErrorRequired = `${String_Error} est obligatoire`;
    const String_ErrorMin = `${String_Error} doit avoir une longueur minimale de {#limit} caractères`;
    const String_ErrorMax = `${String_Error} doit avoir une longueur maximale de {#limit} caractères`;
    const String_ErrorRegexShopName = `${String_Error} doit être une chaîne de caractères valide`;
    const String_ErrorRegexShopTel = `${String_Error} doit être un numéro de téléphone valide (0102030405)`;
    const String_ErrorRegexIBAN = `${String_Error} doit être un IBAN valide (FR14...)`;
    const String_ErrorRegexShopSiret = `${String_Error} doit être un numéro de SIRET valide`;

    const commonMessages = (label) => ({
      "string.base": String_ErrorBase.replace("{#label}", label),
      "string.empty": String_ErrorEmpty.replace("{#label}", label),
      "any.required": String_ErrorRequired.replace("{#label}", label),
      "string.min": String_ErrorMin.replace("{#label}", label),
      "string.max": String_ErrorMax.replace("{#label}", label),
    });

    const schema = Joi.object({
      shopName: Joi.string()
        .regex(/^[a-zA-Z0-9\s\-']*$/)
        .min(2)
        .max(50)
        .required()
        .messages({
          ...commonMessages("Nom de la boutique"),
          "string.pattern.base": String_ErrorRegexShopName.replace(
            "{#label}",
            "Nom de la boutique"
          ),
        }),
      shopAddress: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({ ...commonMessages("Adresse de la boutique") }),
      shopTel: Joi.string()
        .regex(/^\d{10}$/)
        .required()
        .messages({
          ...commonMessages("Numéro de téléphone"),
          "string.pattern.base": String_ErrorRegexShopTel.replace(
            "{#label}",
            "Numéro de téléphone"
          ),
        }),
      shopIban: Joi.string()
        .regex(/^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/)
        .min(27)
        .max(27)
        .required()
        .messages({
          ...commonMessages("IBAN"),
          "string.pattern.base": String_ErrorRegexIBAN.replace(
            "{#label}",
            "IBAN"
          ),
        }),
      shopSiret: Joi.string()
        .regex(/^\d{14}$/)
        .required()
        .messages({
          ...commonMessages("N° de SIRET"),
          "string.pattern.base": String_ErrorRegexShopSiret.replace(
            "{#label}",
            "N° de SIRET"
          ),
        }),
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      email: Joi.string().required(),
      secretKey: Joi.string().required(),
    });

    const { error } = schema.validate(formData);
    console.log(schema.validate(formData));

    if (error) {
      setgoToValidate(false);
      setShopNameError("");
      setShopAddressError("");
      setShopTelError("");
      setShopIbanError("");
      setShopSiretError("");

      error.details.forEach((detail) => {
        if (detail.path[0] === "shopName") {
          setShopNameError(detail.message);
        } else if (detail.path[0] === "shopAddress") {
          setShopAddressError(detail.message);
        } else if (detail.path[0] === "shopTel") {
          setShopTelError(detail.message);
        } else if (detail.path[0] === "shopIban") {
          setShopIbanError(detail.message);
        } else if (detail.path[0] === "shopSiret") {
          setShopSiretError(detail.message);
        }
      });
      return;
    }

    try {
      await axios.get(
        `${SEND_EMAIL_TO_ARTISAN}?lastName=${formData.lastName}&firstName=${formData.firstName}&email=${formData.email}&secretKey=${formData.secretKey}&shopName=${formData.shopName}&shopAddress=${formData.shopAddress}&shopTel=${formData.shopTel}&shopIban=${formData.shopIban}&shopSiret=${formData.shopSiret}`
      );
      dispatch(updateArtisan(formData));
      dispatch(addShop(formData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleShopNameChange = (e) => {
    setFormData({ ...formData, shopName: e.target.value });
  };

  const handleShopAddressChange = (e) => {
    setFormData({ ...formData, shopAddress: e.target.value });
  };

  const handleShopTelChange = (e) => {
    setFormData({ ...formData, shopTel: e.target.value });
  };

  const handleShopIbanChange = (e) => {
    setFormData({ ...formData, shopIban: e.target.value });
  };

  const handleShopSiretChange = (e) => {
    setFormData({ ...formData, shopSiret: e.target.value });
  };

  return (
    <>
      {goToValidate ? (
        <InscriptionFormSecretKey />
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className={InscriptionFormArtisanBoutiqueStyle.inscriptionForm}
        >
          <label>
            Nom de la boutique
            <input
              type="text"
              name="shopName"
              required
              placeholder="Écrire un nom de boutique"
              onChange={handleShopNameChange}
              value={formData.shopName}
            />
            <p className={InscriptionFormArtisanBoutiqueStyle.inscriptionFormError}>{shopNameError}</p>
          </label>

          <label>
            Adresse de la boutique
            <input
              type="text"
              name="shopAddress"
              required
              placeholder="Écrire une adresse"
              onChange={handleShopAddressChange}
              value={formData.shopAddress}
            />
            <p className={InscriptionFormArtisanBoutiqueStyle.inscriptionFormError}>{shopAddressError}</p>
          </label>

          <label>
            Numéro de téléphone
            <input
              type="tel"
              name="shopTel"
              required
              placeholder="Écrire un numéro de téléphone"
              onChange={handleShopTelChange}
              value={formData.shopTel}
            />
            <p className={InscriptionFormArtisanBoutiqueStyle.inscriptionFormError}>{shopTelError}</p>
          </label>

          <label>
            IBAN
            <input
              type="text"
              name="shopIban"
              required
              placeholder="Écrire un IBAN"
              onChange={handleShopIbanChange}
              value={formData.shopIban}
            />
            <p className={InscriptionFormArtisanBoutiqueStyle.inscriptionFormError}>{shopIbanError}</p>
          </label>

          <label>
            N° de SIRET
            <input
              type="text"
              name="shopSiret"
              required
              placeholder="Écrire un numéro de SIRET"
              onChange={handleShopSiretChange}
              value={formData.shopSiret}
            />
            <p className={InscriptionFormArtisanBoutiqueStyle.inscriptionFormError}>{shopSiretError}</p>
          </label>

          <ButtonSubmitWithPoint color={"BLACK"} text="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default InscriptionFormArtisanBoutique;
